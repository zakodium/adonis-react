declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    react: {
      render(Component: any, props?: Record<string, unknown>): string;
    };
  }
}
