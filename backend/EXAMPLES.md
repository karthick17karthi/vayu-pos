# 🔧 Code Examples & Integration Guide

## Table of Contents

1. [Frontend Integration Examples](#frontend-integration-examples)
2. [API Request Examples](#api-request-examples)
3. [Error Handling Examples](#error-handling-examples)
4. [Advanced Integration](#advanced-integration)

---

## Frontend Integration Examples

### React Form with Fetch API

```jsx
import React, { useState } from 'react';

export default function DemoRequestForm() {
  const [formData, setFormData] = useState({
    owner_name: '',
    hotel_name: '',
    license_number: '',
    phone: '',
    email: '',
    city: '',
    branches: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('http://localhost:5000/api/demo-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          owner_name: '',
          hotel_name: '',
          license_number: '',
          phone: '',
          email: '',
          city: '',
          branches: '',
          message: '',
        });
        
        // Show success message
        alert('Demo request submitted successfully!');
      } else {
        setError(data.message || 'Failed to submit request');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error('Submit error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Request POS Demo</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Demo request submitted! We'll contact you soon.
        </div>
      )}

      {/* Owner Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Owner Name *</label>
        <input
          type="text"
          name="owner_name"
          value={formData.owner_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Your full name"
        />
      </div>

      {/* Hotel Name */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Hotel Name *</label>
        <input
          type="text"
          name="hotel_name"
          value={formData.hotel_name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Your business name"
        />
      </div>

      {/* License Number */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">License Number *</label>
        <input
          type="text"
          name="license_number"
          value={formData.license_number}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Business license number"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Phone *</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="+91-9876543210"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Email *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="your@email.com"
        />
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">City *</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
          placeholder="Mumbai"
        />
      </div>

      {/* Branches */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Number of Branches *</label>
        <input
          type="number"
          name="branches"
          value={formData.branches}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-4 py-2 border rounded"
          placeholder="5"
        />
      </div>

      {/* Message */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Message *</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded h-32"
          placeholder="Tell us about your requirements..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded font-semibold text-white ${
          loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Submitting...' : 'Request Demo'}
      </button>
    </form>
  );
}
```

---

### Vue.js Component Example

```vue
<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Request POS Demo</h1>

    <!-- Error Alert -->
    <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {{ error }}
    </div>

    <!-- Success Alert -->
    <div v-if="success" class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
      ✅ Demo request submitted! We'll contact you soon.
    </div>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label class="block font-semibold mb-2">Owner Name *</label>
        <input
          v-model="formData.owner_name"
          type="text"
          required
          class="w-full px-4 py-2 border rounded"
          placeholder="Your full name"
        />
      </div>

      <!-- Similar fields for other inputs -->

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-2 px-4 rounded font-semibold text-white"
        :class="loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'"
      >
        {{ loading ? 'Submitting...' : 'Request Demo' }}
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        owner_name: '',
        hotel_name: '',
        license_number: '',
        phone: '',
        email: '',
        city: '',
        branches: '',
        message: '',
      },
      loading: false,
      success: false,
      error: '',
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = '';
      this.success = false;

      try {
        const response = await fetch('http://localhost:5000/api/demo-request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        const data = await response.json();

        if (data.success) {
          this.success = true;
          this.resetForm();
        } else {
          this.error = data.message;
        }
      } catch (err) {
        this.error = `Error: ${err.message}`;
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
      this.formData = {
        owner_name: '',
        hotel_name: '',
        license_number: '',
        phone: '',
        email: '',
        city: '',
        branches: '',
        message: '',
      };
    },
  },
};
</script>
```

---

## API Request Examples

### Using cURL

**Basic Request:**
```bash
curl -X POST http://localhost:5000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "owner_name": "Rajesh Kumar",
    "hotel_name": "The Grand Hotel",
    "license_number": "LIC-2025-001",
    "phone": "+91-9876543210",
    "email": "rajesh@hotel.com",
    "city": "Mumbai",
    "branches": 5,
    "message": "Interested in demo"
  }'
```

**With Error Handling:**
```bash
#!/bin/bash

RESPONSE=$(curl -s -X POST http://localhost:5000/api/demo-request \
  -H "Content-Type: application/json" \
  -d '{
    "owner_name": "Rajesh Kumar",
    "hotel_name": "The Grand Hotel",
    "license_number": "LIC-2025-001",
    "phone": "+91-9876543210",
    "email": "rajesh@hotel.com",
    "city": "Mumbai",
    "branches": 5,
    "message": "Interested in demo"
  }')

echo "Response: $RESPONSE"

# Check if successful
if echo "$RESPONSE" | grep -q '"success":true'; then
  echo "✅ Request submitted successfully!"
else
  echo "❌ Request failed!"
fi
```

---

### Using JavaScript (Node.js)

```javascript
const http = require('http');

function submitDemoRequest(demoData) {
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/demo-request',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response);
        } catch (err) {
          reject(err);
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.write(JSON.stringify(demoData));
    req.end();
  });
}

// Usage
const demoData = {
  owner_name: 'Rajesh Kumar',
  hotel_name: 'The Grand Hotel',
  license_number: 'LIC-2025-001',
  phone: '+91-9876543210',
  email: 'rajesh@hotel.com',
  city: 'Mumbai',
  branches: 5,
  message: 'Interested in demo',
};

submitDemoRequest(demoData)
  .then((response) => {
    console.log('✅ Success:', response);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
  });
```

---

### Using Axios

```javascript
const axios = require('axios');

const submitDemoRequest = async () => {
  try {
    const response = await axios.post('http://localhost:5000/api/demo-request', {
      owner_name: 'Rajesh Kumar',
      hotel_name: 'The Grand Hotel',
      license_number: 'LIC-2025-001',
      phone: '+91-9876543210',
      email: 'rajesh@hotel.com',
      city: 'Mumbai',
      branches: 5,
      message: 'Interested in demo',
    });

    console.log('✅ Success:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('❌ Error:', error.response.data);
    } else {
      console.error('❌ Network Error:', error.message);
    }
    throw error;
  }
};

submitDemoRequest();
```

---

### Using Python

```python
import requests
import json

def submit_demo_request():
    url = 'http://localhost:5000/api/demo-request'
    
    data = {
        'owner_name': 'Rajesh Kumar',
        'hotel_name': 'The Grand Hotel',
        'license_number': 'LIC-2025-001',
        'phone': '+91-9876543210',
        'email': 'rajesh@hotel.com',
        'city': 'Mumbai',
        'branches': 5,
        'message': 'Interested in demo',
    }
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.post(url, json=data, headers=headers)
        response.raise_for_status()  # Raise exception for bad status
        
        result = response.json()
        
        if result.get('success'):
            print('✅ Success:', json.dumps(result, indent=2))
            return result
        else:
            print('❌ Error:', result.get('message'))
            return None
            
    except requests.exceptions.RequestException as e:
        print(f'❌ Network Error: {e}')
        return None

# Usage
submit_demo_request()
```

---

### Using PHP

```php
<?php

function submitDemoRequest() {
    $url = 'http://localhost:5000/api/demo-request';
    
    $data = [
        'owner_name' => 'Rajesh Kumar',
        'hotel_name' => 'The Grand Hotel',
        'license_number' => 'LIC-2025-001',
        'phone' => '+91-9876543210',
        'email' => 'rajesh@hotel.com',
        'city' => 'Mumbai',
        'branches' => 5,
        'message' => 'Interested in demo',
    ];
    
    $options = [
        'http' => [
            'header' => "Content-Type: application/json\r\n",
            'method' => 'POST',
            'content' => json_encode($data),
        ],
    ];
    
    $context = stream_context_create($options);
    
    try {
        $response = file_get_contents($url, false, $context);
        $result = json_decode($response, true);
        
        if ($result['success']) {
            echo "✅ Success!\n";
            echo json_encode($result, JSON_PRETTY_PRINT);
            return $result;
        } else {
            echo "❌ Error: " . $result['message'] . "\n";
            return null;
        }
    } catch (Exception $e) {
        echo "❌ Error: " . $e->getMessage() . "\n";
        return null;
    }
}

// Usage
submitDemoRequest();

?>
```

---

## Error Handling Examples

### Handle Missing Fields

```javascript
try {
  const response = await fetch('http://localhost:5000/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner_name: 'John' }), // Missing fields
  });

  const data = await response.json();

  if (!data.success) {
    console.error('Missing fields:', data.requiredFields);
    // Display error to user
  }
} catch (error) {
  console.error('Network error:', error);
}
```

### Handle Invalid Email

```javascript
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const submitForm = async (formData) => {
  if (!validateEmail(formData.email)) {
    alert('Please enter a valid email address');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/demo-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    
    if (data.success) {
      alert('Demo request submitted!');
    } else {
      alert(`Error: ${data.message}`);
    }
  } catch (error) {
    alert(`Submission failed: ${error.message}`);
  }
};
```

### Implement Retry Logic

```javascript
const submitWithRetry = async (formData, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch('http://localhost:5000/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        return data;
      }
      
      // Don't retry on client errors (400)
      if (response.status >= 400 && response.status < 500) {
        throw new Error(data.message);
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      
      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
};
```

---

## Advanced Integration

### Integrate with Frontend Form Validation

```javascript
const validateForm = (data) => {
  const errors = {};

  if (!data.owner_name || data.owner_name.trim().length < 3) {
    errors.owner_name = 'Owner name must be at least 3 characters';
  }

  if (!data.hotel_name || data.hotel_name.trim().length < 3) {
    errors.hotel_name = 'Hotel name must be at least 3 characters';
  }

  if (!data.license_number) {
    errors.license_number = 'License number is required';
  }

  if (!data.phone || !/^[\d\-\+\s()]+$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.city || data.city.trim().length < 2) {
    errors.city = 'Please enter a valid city name';
  }

  if (!data.branches || data.branches < 1) {
    errors.branches = 'Number of branches must be at least 1';
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
```

### Add Loading State Management

```javascript
const [formState, setFormState] = useState({
  data: {},
  loading: false,
  error: null,
  success: false,
  validationErrors: {},
});

const submitForm = async (formData) => {
  const validation = validateForm(formData);

  if (!validation.isValid) {
    setFormState((prev) => ({
      ...prev,
      validationErrors: validation.errors,
    }));
    return;
  }

  setFormState((prev) => ({
    ...prev,
    loading: true,
    error: null,
    validationErrors: {},
  }));

  try {
    const response = await fetch('http://localhost:5000/api/demo-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setFormState((prev) => ({
        ...prev,
        success: true,
        loading: false,
        data: data.data,
      }));
    } else {
      setFormState((prev) => ({
        ...prev,
        error: data.message,
        loading: false,
      }));
    }
  } catch (err) {
    setFormState((prev) => ({
      ...prev,
      error: err.message,
      loading: false,
    }));
  }
};
```

---

### Email Notification on Success

```javascript
const sendConfirmationEmail = async (customerData) => {
  // Send confirmation email to customer
  await fetch('your-backend/send-confirmation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: customerData.email,
      subject: 'Demo Request Received',
      message: `Hi ${customerData.owner_name}, your demo request has been received!`,
    }),
  });
};

const submitForm = async (formData) => {
  const response = await fetch('http://localhost:5000/api/demo-request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (data.success) {
    // Send confirmation to customer
    await sendConfirmationEmail(formData);
    
    // Update analytics
    trackEvent('demo_request_submitted', formData);
  }
};
```

---

These examples demonstrate various ways to integrate the Vayu POS Demo Request API with different technologies and patterns. Choose the one that best fits your application architecture!
