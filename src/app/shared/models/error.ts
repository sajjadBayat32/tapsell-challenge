export interface IError {
  error: boolean;
  message: {
    errors: {
      title: any;
    };
    message: string;
    name: string;
  };
}
