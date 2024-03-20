import consola from "consola";

export const createLogger = (context: string) => {
  const logger = consola.withTag(context);
  logger.level = 5;
  return logger;
};
