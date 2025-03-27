# TankScape Monitoring System

A real-time tank monitoring system that tracks tank levels across multiple rooms and sends alerts through various channels including Telegram.

## System Architecture

The system consists of several components:

1. **Frontend (tankscape-visualizer)**

   - React-based dashboard
   - Real-time tank level visualization
   - Built with Vite, TypeScript, and Tailwind CSS

2. **Backend Services**

   - Publisher Service: Handles tank data collection and MQTT publishing
   - Subscriber Service: Processes MQTT messages and forwards to n8n
   - MQTT Broker: Uses test.mosquitto.org for message handling (for test only!!!)

3. **Integration Layer**
   - n8n for workflow automation
   - Telegram integration for alerts
   - Webhook endpoints for data flow

## Prerequisites

- Node.js (v14 or higher)
- npm
- n8n instance running locally or in cloud
- Telegram Bot Token (for alerts)

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/warathepj/scada-storage-tank-backend.git
   git clone https://github.com/warathepj/tankscape-visualizer.git
   ```

2. **Frontend Setup**

   ```bash
   cd tankscape-visualizer
   npm install
   npm run dev
   ```

3. **Backend Setup**

   ```bash
   cd scada-storage-tank-backend
   npm install
   ```

4. **Start the services**

   ```bash
   # Start the publisher
   node publisher.js

   # Start the subscriber in a new terminal
   node subscriber.js
   ```

## Configuration

1. **n8n Webhook Setup**

   - Create a new workflow in n8n
   - Add Webhook node as trigger
   - Configure Telegram node for alerts
   - Set the webhook URL in `subscriber.js`

2. **MQTT Topics**

   - `tankscape/tanks`: Regular tank data updates
   - `tankscape/alerts`: Alert messages for low tank levels

## Data Flow

1. Frontend updates tank levels every 5 seconds (simulated)
2. Data is sent to the publisher service
3. Publisher broadcasts to MQTT topics
4. Subscriber receives messages and forwards to n8n
5. n8n processes data and sends alerts to Telegram

## Alert Conditions

- Low Level Alert: Tank level <= 25%
- High Level Alert: Tank level >= 90%

## Development

- Frontend runs on port 8080
- Publisher service runs on port 3001
- n8n webhook endpoint configured as needed

## License

MIT License
