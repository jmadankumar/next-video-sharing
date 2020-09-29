export interface LocalMessage extends IncomingMessage {
  locals: { [name: string]: any };
}

export interface LocalPageContext extends NextPageContext {
  req: LocalMessages | undefined;
}
