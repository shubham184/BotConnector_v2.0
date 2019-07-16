<<<<<<< HEAD
![Bot Connector Logo](https://cdn.cai.tools.sap/bot-connector/bot-connector-logo.png)

| [Supported Channels](#supported-channels) | [Getting Started](#getting-started) | [How it works](#how-it-works) | [Messages Formats](#messages-format) | [Getting Started with SAP Conversational AI]( #getting-started-with-sap-conversational-ai) |
|---|---|---|---|---|

[💬 Questions / Comments? Join the discussion on our community Slack channel!](https://slack.cai.tools.sap)

# Bot Connector

Bot Connector allows you to connect your bot to multiple messaging channels.

It provides a higher level API to manage several messaging platforms at once, and lets you focus on your bot by using a simple and unique format to talk to the entire world.

## 📝 Table of Contents
- [About](#about)
- [Prerequisites](#Prerequisites)
- [Installing](#Installing)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>
The bot connector is used to receive messages from various channels, and parse them into a format that the chatbot NLP AI can process. Messages will be forwarded to the routing logic component, and answers received will be posted back to the correct conversations.

This project contains the bot connector, cloned from SAP CAI Github, and will contain some small adjustments and configuration changes. Major changes:

- require HTTPS certificate
- CORS enabled on groupemutuel.ch
- configuration to route to routing logic and receive messages from there

### Prerequisites
- Node.JS. We recommend the LTS version from [https://nodejs.org/en/](https://nodejs.org/en/)
- Access to MongoDB. You can also install a local MongoDB
- Access to Redis server. you can install a local Redis server if needed
- To download and install the bot connector, we recommend using git
- yarn - https://yarnpkg.com/en/

### Installing
Download the bot connector code from gitlab or github. 
```
git clone <<repository address>>
```
once it has been downloaded, install the necessary node modules
```
npm install
```
After the installation, please update the configuration file in config\development.js to use the correct settings. The delivery is done witht he bot connector running on port 8082, but that can be changed by changing the port number in the configuration file. 

See below for a config file with local mongodb and redis server, running on port 8082
```
module.exports = {
  db: {
    host: '127.0.0.1',
    port: '27017',
    dbName: 'SAPCAIGroupeMutuel',
  },
  server: {
    port: 8082,
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    auth: '',
    db: 14,
    options: {}, // see https://github.com/mranney/node_redis#rediscreateclient
  },
  base_url: 'http://localhost:8082'
}
```
To start the system, use the following command:

```
yarn start:dev
```
Eventually, if no errors occur, you will see the following output:
```
2019-06-27T09:13:46.583Z - info: App is running and listening to port 8082
```

## 🎈 Usage <a name="usage"></a>
To use the bot connector, we first need to create
- A connector
- at least 1 channel on that connector

#### Creating a connector
Once the bot connector application is running, we need to create a connector to route messages to the routing logic application.

To do that, we have to send a JSON object to the bot connector endpoint with the URL of the routing logic endpoint. Example JSON if routing logic is running on the local server on port 8083:

```
{ 
  "url": "http://localhost:8083/routeMessage" 
}
```

Post this JSON to the connector endpoint. If running on the local host on port 8082, the endpoint will be https://localhost:8082/v1/connectors.
This will create a new connector in the local Bot connector, and store the details in the MongoDB. If succesfull, an ojbect like below will be returned. Please make a note of the ID; we need it to create channels.
```
{
    "results": {
        "id": "3658ce91-c4e3-4887-83a4-4860d9e384f5",
        "url": "http://localhost:8083/routeMessage",
        "isTyping": true,
        "conversations": [],
        "channels": []
    },
    "message": "Connector successfully created"
}
```

#### Creating webchat channels
To create a channel for webchat, we need to enter the following JSON structure. 
```
{
	"isActivated":true, 
	"slug":"webchatlocal", 
	"type":"webchat"
}
```
The slug is a unique name for the channel. I suggest creating two channels, 1 for french webchat and 1 for german webchat, by offering the following two JSON objects to the bot connector endpoint

French webchat
```
{
	"isActivated":true, 
	"slug":"webchatfr", 
	"type":"webchat"
}
```
German webchat
```
{
	"isActivated":true, 
	"slug":"webchatde", 
	"type":"webchat"
}
```
Post these JSON objects to the endpoint for channel creation. If my connector id is 3658ce91-c4e3-4887-83a4-4860d9e384f5, the endpoint will be https://localhost:8082/v1/connectors/3658ce91-c4e3-4887-83a4-4860d9e384f5/channels

If channel is succesfully created, the following JSON will be returned
```
{
    "results": {
        "id": "7f4ef541-830a-40bf-87bb-49f50946a016",
        "userInputPlaceholder": "Write a reply",
        "updatedAt": "2019-06-18T13:25:46.440Z",
        "createdAt": "2019-06-18T13:25:46.440Z",
        "token": "2e33aba8de0e09b897ec0f80e1079cd3",
        "webhook": "http://localhost:8082/v1/webhook/7f4ef541-830a-40bf-87bb-49f50946a016",
        "slug": "webchatfr",
        "type": "webchat",
        "connector": "3658ce91-c4e3-4887-83a4-4860d9e384f5",
        "locales": [],
        "openingType": "never",
        "hasGetStarted": false,
        "forwardConversationStart": false,
        "isActivated": true,
        "isErrored": false
    },
    "message": "Channel successfully created"
}
```
Please make a note of the token and the channel ID; we need it to hook up the webchat. 

#### Hooking up the webchat component
The webchat component will need to be compiled with the correct server FQDN of the bot connector server. Connect it to the channel by including the channel ID and channel token in the webchat defition on the webpage.

```
<script src="https://cdn.cai.tools.sap/webchat/webchat.js"
	channelId="7f4ef541-830a-40bf-87bb-49f50946a016"
	token="2e33aba8de0e09b897ec0f80e1079cd3"
	id="cai-webchat"
	></script>
```
## 🚀 Deployment <a name = "deployment"></a>


## ⛏️ Built Using <a name = "built_using"></a>
- [MongoDB](https://www.mongodb.com/) - Database
- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [yarn](https://yarnpkg.com/en/) - runtime 

## ✍️ Authors <a name = "authors"></a>
- [@SAP](https://github.com/SAPConversationalAI) - Idea & Initial work


=======
Empty readme
>>>>>>> fcb481f3ccd85bb9d776db220d8145aaf1e6a09f
