import { ApplicationContract } from '@ioc:Adonis/Core/Application';

import { prepareReact } from '../src/React';

export default class ReactProvider {
  public static needsApplication = true;
  public constructor(protected app: ApplicationContract) {}

  public boot() {
    this.app.container.with(['Adonis/Core/HttpContext'], (HttpContext) => {
      HttpContext.getter(
        'react',
        function () {
          return prepareReact({ request: this.request });
        },
        true,
      );
    });
  }
}
