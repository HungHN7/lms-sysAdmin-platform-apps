type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

export function loadComponent<T>(scope: string, module: string) {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');
    const container = window[scope] as Container; // or get the container somewhere else
    // Initialize the container, it may provide shared modules

    // eslint-disable-next-line @typescript-eslint/await-thenable
    await container.init(__webpack_share_scopes__.default);
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const factory = await container.get(module);
    const Module = factory();
    return Module as T;
  };
}
