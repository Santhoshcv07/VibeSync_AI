export type ApiErrorDetail = {
  field: string;
  message: string;
};

export type ApiErrorBody = {
  error: {
    code: string;
    message: string;
    details: ApiErrorDetail[];
    request_id: string | null;
  };
};

export type ApiSuccessResponse<TData, TMeta = void> = {
  data: TData;
  meta: TMeta extends void ? undefined : TMeta;
};

export type HealthResponse = {
  status: string;
  service: string;
  version: string;
};
