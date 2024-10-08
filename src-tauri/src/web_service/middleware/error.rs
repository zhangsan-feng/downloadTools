use axum::http::StatusCode;

use axum::response::{IntoResponse, Response};
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum ApplicationError {
    ServiceError(String),
    DBError(String),
    WithCodeMsg(i32, String),
}

impl IntoResponse for ApplicationError {
    fn into_response(self) -> Response {
        let (status, error_message) = match self {
            ApplicationError::ServiceError(msg) => (StatusCode::BAD_GATEWAY, msg),
            ApplicationError::DBError(msg) => (StatusCode::BAD_GATEWAY, msg),
            _ => (StatusCode::BAD_GATEWAY, "".to_string()),
        };

        (status, error_message).into_response()
        // (status, Json()).into_response()
    }
}

impl<E> From<E> for ApplicationError
where
    E: Into<anyhow::Error>,
{
    fn from(err: E) -> Self {
        let anyhow_err: anyhow::Error = err.into();
        // info!("{}", *anyhow_err.backtrace());
        // info!("{}", anyhow_err.to_string());

        // if let backtrace = anyhow_err.backtrace() {
        //     for frame in backtrace.frames(){
        //         if let Some(symbol) = frame.symbols().next() {
        //             if let Some(filename) = symbol.filename() {
        //                 if let Some(line) = symbol.lineno() {
        //                     println!("Error at {}:{}: {}", filename.display(), line, res);
        //                 }
        //             }
        //         }
        //     }
        // }

        ApplicationError::ServiceError(anyhow_err.to_string())
    }
}
