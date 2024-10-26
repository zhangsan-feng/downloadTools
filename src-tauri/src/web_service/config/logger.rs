use crate::web_service::config::static_path::LOGGER_PATH;
use log::info;

pub async fn init_logger() {
    let date = chrono::Local::now().format("%Y-%m-%d");
    let logfile_path = format!("{}/{}.log", LOGGER_PATH, date);

    // println!("{}", logfile_path);
    let mut dispatch = fern::Dispatch::new();
    dispatch = dispatch
        .format(|out, message, record| {
            let file = record.file().unwrap_or("<unknown>");
            let line = record.line().unwrap_or(0);
            out.finish(format_args!(
                "[{}] [{}] [{}.{}] {}  ",
                chrono::Local::now().format("%Y-%m-%d %H:%M:%S"),
                record.level(),
                file,
                line,
                message
            ))
        })
        .level(log::LevelFilter::Info)
        // .level(log::LevelFilter::Error)
        // .level(log::LevelFilter::Trace)
        // .level(log::LevelFilter::Warn)
        // .level(log::LevelFilter::Debug)
        .chain(std::io::stdout())
        .chain(fern::log_file(logfile_path).expect("Failed to create log file"));
    dispatch.apply().unwrap();

    info!("init logger success")
}
