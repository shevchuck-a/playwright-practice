/* eslint-disable no-undef */
import http from "k6/http";
import { Trend } from "k6/metrics";
import { group, check } from "k6";

export const get_products_trend = new Trend("get_products_trend");

// Configuration
export const options = {
  discardResponseBodies: true,
  cloud: {
    projectID: 1000001,
    name: `get-products`,
    distribution: {
      distributionLabel1: { loadZone: "amazon:de:frankfurt", percent: 50 },
      distributionLabel2: { loadZone: "amazon:us:columbus", percent: 50 },
    },
  },
  scenarios: {
    load:{
      executor: 'shared-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '60s',
    }
  },
  thresholds: {
    http_req_failed: [
      { 
        threshold: 'rate<0.01', // http errors should be less than 1% 
        abortOnFail: true 
      }
    ], 
    get_products_trend: [
      { 
        threshold: 'p(95)<50000', // 95% of requests should be below 50s
        abortOnFail: true, 
        delayAbortEval: '30s' 
      }
    ], 
    checks: [
      { 
        threshold: 'rate>0.99', // 99% of checks should pass
        abortOnFail: true, 
        delayAbortEval: '30s' 
      }
    ],
  },
};

const APIURL = __ENV.APIURL || "https://automationexercise.com/api/productsList";
const DEBUG = __ENV.DEBUG_K6_TEST || false;

// Setup
export function setup() {}

// Test
export default function () {
  group("Get All Products", function () {
    const response = http.get(APIURL, {
      tags: { name: `Request all products` },
    });

    if (DEBUG) {
      console.log("Response: ", response);
    }


    check(response, {
      'is status 200': (r) => r.status === 200,
    });

    if (DEBUG) {
      console.log(`Response time for ${file.Extension}: ${response.timings.duration} ms`);
    }

    get_products_trend.add(response.timings.duration);
  });
};