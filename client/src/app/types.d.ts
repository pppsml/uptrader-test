declare type RootState = ReturnType<typeof import("./store").store.getState>;
declare type RootDispatch = import("redux").Dispatch<
  | import('@/entities/task').DispatchTaskActions
  | import('@/entities/project').DispatchProjectActions12
>;