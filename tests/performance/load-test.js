import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
};

export default function () {
  const res1 = http.get('https://airportgap.com/api/airports');
  check(res1, {
    'status 200': (r) => r.status === 200,
    'menos de 1000ms': (r) => r.timings.duration < 1000,
  });

  const res2 = http.get('https://airportgap.com/api/airports/JFK');
  check(res2, {
    'JFK status 200': (r) => r.status === 200,
  });
  sleep(1);
}