import { ApplicationContract } from '@ioc:Adonis/Core/Application';

import { prepareReact } from '../src/React';
import { useAdonisContext } from '../src/adonisContext';

export default class ReactProvider {
  public static needsApplication = true;
  public constructor(protected app: ApplicationContract) {}

  public register() {
    this.app.container.singleton('React', () => {
      return {
        useAdonisContext,
      };
    });
  }

  public boot() {
    this.app.container.withBindings(
      [
        'Adonis/Core/HttpContext',
        'Adonis/Core/Application',
        'Adonis/Core/Route',
      ],
      (HttpContext, app, Route) => {
        HttpContext.getter(
          'react',
          function () {
            return prepareReact(this, app, Route);
          },
          true,
        );
      },
    );
  }
}
