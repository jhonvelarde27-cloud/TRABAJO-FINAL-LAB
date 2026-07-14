import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '30s', target: 20 },
    { duration: '60s', target: 20 },
    { duration: '30s', target: 50 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

export default function () {
  const res = http.get('https://airportgap.com/api/airports');
  check(res, {
    'status 200': (r) => r.status === 200,
    'responde en <1000ms': (r) => r.timings.duration < 1000,
  });
  sleep(1);
}