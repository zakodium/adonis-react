declare module '@ioc:React' {
  import { ApplicationContract } from '@ioc:Adonis/Core/Application';
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
  import { RequestContract } from '@ioc:Adonis/Core/Request';
  import { MakeUrlOptions, MakeSignedUrlOptions } from '@ioc:Adonis/Core/Route';

  export interface AdonisContextContract {
    app: ApplicationContract;
    ctx: HttpContextContract;
    request: RequestContract;
    params: HttpContextContract['params'];
    route: HttpContextContract['route'];
    makeUrl: (
      routeIdentifier: string,
      options?: MakeUrlOptions,
      domain?: string,
    ) => string;
    makeSignedUrl: (
      routeIdentifier: string,
      options?: MakeSignedUrlOptions,
      domain?: string,
    ) => string;
  }

  export function useAdonisContext(): AdonisContextContract;
}
declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    react: {
      share(obj: Record<string, unknown>): void;
      render(Component: any, props?: Record<string, unknown>): string;
    };
  }
}
