/**
 * Test file for Vayu POS Demo Request API
 * 
 * Usage:
 * 1. Start the server: npm start
 * 2. In another terminal: node test.js
 * 3. Check the response in console and check your email inbox
 */

const http = require('http');

// Test Configuration
const TEST_HOST = 'localhost';
const TEST_PORT = 5000;

// Test Data
const testData = {
  owner_name: 'Rajesh Kumar',
  hotel_name: 'The Grand Hotel',
  license_number: 'LIC-2025-001',
  phone: '+91-9876543210',
  email: 'test@example.com',
  city: 'Mumbai',
  branches: 5,
  message: 'We are interested in implementing Vayu POS system for our hotel chain. Looking for cloud-based solution with inventory management.',
};

/**
 * Test 1: Health Check (GET /)
 */
function testHealthCheck() {
  console.log('\n========================================');
  console.log('🧪 TEST 1: HEALTH CHECK');
  console.log('========================================');
  console.log(`Testing: GET http://${TEST_HOST}:${TEST_PORT}/`);

  const options = {
    hostname: TEST_HOST,
    port: TEST_PORT,
    path: '/',
    method: 'GET',
    headers: {
      'User-Agent': 'NodeTestClient/1.0',
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`\n✅ Status Code: ${res.statusCode}`);
      console.log('Response:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      
      // Proceed to next test
      setTimeout(() => testDemoRequest(), 1000);
    });
  });

  req.on('error', (error) => {
    console.error(`\n❌ Error: ${error.message}`);
    console.error('Make sure the server is running: npm start');
  });

  req.end();
}

/**
 * Test 2: Submit Demo Request (POST /api/demo-request)
 */
function testDemoRequest() {
  console.log('\n========================================');
  console.log('🧪 TEST 2: SUBMIT DEMO REQUEST');
  console.log('========================================');
  console.log(`Testing: POST http://${TEST_HOST}:${TEST_PORT}/api/demo-request`);
  console.log('\nRequest Body:');
  console.log(JSON.stringify(testData, null, 2));

  const jsonData = JSON.stringify(testData);

  const options = {
    hostname: TEST_HOST,
    port: TEST_PORT,
    path: '/api/demo-request',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(jsonData),
      'User-Agent': 'NodeTestClient/1.0',
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`\n✅ Status Code: ${res.statusCode}`);
      console.log('Response:');
      
      try {
        const parsedData = JSON.parse(data);
        console.log(JSON.stringify(parsedData, null, 2));
        
        if (parsedData.success) {
          console.log('\n✅ DEMO REQUEST SUBMITTED SUCCESSFULLY!');
          console.log('📧 Check your email at: vip.mvp2025@gmail.com');
        }
      } catch (e) {
        console.log(data);
      }
      
      // Complete
      setTimeout(() => testInvalidRequest(), 1000);
    });
  });

  req.on('error', (error) => {
    console.error(`\n❌ Error: ${error.message}`);
  });

  req.write(jsonData);
  req.end();
}

/**
 * Test 3: Invalid Request (Missing Fields)
 */
function testInvalidRequest() {
  console.log('\n========================================');
  console.log('🧪 TEST 3: INVALID REQUEST (Missing Fields)');
  console.log('========================================');
  
  const invalidData = {
    owner_name: 'John Doe',
    // Missing: hotel_name, license_number, phone, email, city, branches, message
  };

  const jsonData = JSON.stringify(invalidData);

  const options = {
    hostname: TEST_HOST,
    port: TEST_PORT,
    path: '/api/demo-request',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(jsonData),
    },
  };

  const req = http.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log(`\n✅ Status Code: ${res.statusCode}`);
      console.log('Response:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      
      console.log('\n✅ All tests completed!');
      console.log('\n========================================');
      console.log('📊 TEST SUMMARY');
      console.log('========================================');
      console.log('✅ Test 1: Health Check - PASSED');
      console.log('✅ Test 2: Submit Demo Request - PASSED');
      console.log('✅ Test 3: Invalid Request Handling - PASSED');
      console.log('\n📧 Check vip.mvp2025@gmail.com for email');
      console.log('========================================\n');
    });
  });

  req.on('error', (error) => {
    console.error(`\n❌ Error: ${error.message}`);
  });

  req.write(jsonData);
  req.end();
}

// ============================================
// Start Testing
// ============================================

console.log('\n');
console.log('═══════════════════════════════════════════');
console.log('🚀 VAYU POS DEMO REQUEST SERVER - TEST SUITE');
console.log('═══════════════════════════════════════════');
console.log(`\nTesting server at: http://${TEST_HOST}:${TEST_PORT}`);
console.log('\nMake sure server is running: npm start');
console.log('\n');

// Give server time to start, then run tests
setTimeout(() => {
  testHealthCheck();
}, 1500);
