declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    react: {
      share(obj: Record<string, unknown>): void;
      render(Component: any, props?: Record<string, unknown>): string;
    };
  }
}
