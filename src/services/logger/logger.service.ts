import { Logger, LoggerService } from "@nestjs/common";

export class MyLogger implements LoggerService {
  log(message: string) {
    Logger.log(message);
  }
  error(message: string, trace: string) {
    Logger.error(message);
  }
  warn(message: string) {
    Logger.warn(message);
  }
}
