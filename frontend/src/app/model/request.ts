export class Request {
  id: number;
  status: string;
  type: string;
  other: {
    /* vacancies request */
    agency: string;
    vacancies: number;
    /* job cancellation request */
    id: number;
    cancellationReason: string;
    /* registration request */
    username: string;
    email: string;
    type: string;
  };
}