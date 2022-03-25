import axios from 'axios';
import config from '../config';
import { FullfillRequestData, IMakeRequestResult, IRequest } from '../interfaces';

export async function makeRequest({ jobId, data, request_key }: IRequest): Promise<IMakeRequestResult> {
  const uri = `${config.chainlink.url}/v2/jobs/${jobId}/runs`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Chainlink-EA-AccessKey': config.chainlink.inAccessKey,
    'X-Chainlink-EA-Secret': config.chainlink.inSecret,
  };
  const response = await axios.post(uri, JSON.parse(data), { headers });
  return { request_key, data: response.data };
}

export async function sendRequests(requests: IRequest[]): Promise<FullfillRequestData[]> {
  const responses = await Promise.all(requests.map(makeRequest));
  console.log(responses);
  return responses.map(handleResponse);
}

export function handleResponse({ data, request_key }: IMakeRequestResult): FullfillRequestData {
  const result: FullfillRequestData = { request_key };
  if (data.outputs) {
    result['data'] = JSON.stringify({ data: data.outputs });
  } else if (data.errors) {
    result['error'] = data.errors.join('&&');
  } else {
    result['error'] = 'Unknown error';
  }
  return result;
}
