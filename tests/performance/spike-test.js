import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 5 },
    { duration: '5s', target: 100 },
    { duration: '10s', target: 100 },
    { duration: '5s', target: 5 },
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.10'],
  },
};

export default function () {
  const res = http.get('https://restful-booker.herokuapp.com/booking');
  check(res, {
    'status 200': (r) => r.status === 200,
    'tiene datos': (r) => Array.isArray(JSON.parse(r.body)),
  });
  sleep(0.5);
}