/* eslint-disable no-undef */
const NOTIFICATION_ENDPOINT = "/example-fetch.json";
const URL_TO_DEFAULT_ICON = "/images/icon-192x192.png";

import { register } from "register-service-worker";

if (process.env.NODE_ENV === "production") {
  self.addEventListener("push", function(event) {
    console.log("Received a push message", event);
    // Since there is no payload data with the first version
    // of push messages, we'll grab some data from
    // an API and use it to populate a notification
    event.waitUntil(
      fetch(NOTIFICATION_ENDPOINT)
        .then(function(response) {
          if (response.status !== 200) {
            // Either show a message to the user explaining the error
            // or enter a generic message and handle the
            // onnotificationclick event to direct the user to a web page
            console.log(
              "Looks like there was a problem. Status Code: " + response.status
            );
            throw new Error();
          }

          // Examine the text in the response
          return response.json().then(function(data) {
            if (data.error || !data.notification) {
              console.error("The API returned an error.", data.error);
              throw new Error();
            }

            const title = data.notification.title;
            const message = data.notification.message;
            const icon = data.notification.icon;
            const notificationTag = data.notification.tag;
            const notificationData = data.notification.data;

            return self.registration.showNotification(title, {
              body: message,
              icon: icon,
              tag: notificationTag,
              data: notificationData
            });
          });
        })
        .catch(function(err) {
          console.error("Unable to retrieve data", err);

          const title = "An error occurred";
          const message =
            "We were unable to get the information for this push message";
          const icon = URL_TO_DEFAULT_ICON;
          const notificationTag = "simple-push-demo-notification-tag";
          return self.registration.showNotification(title, {
            body: message,
            icon: icon,
            tag: notificationTag
          });
        })
    );
  });

  self.addEventListener("notificationclick", function(event) {
    console.log("On notification click: ", event);

    // check for data support
    if (Notification.prototype.hasOwnProperty("data")) {
      console.log("Using Data");
      const url = event.notification.data.url;
      event.waitUntil(clients.openWindow(url));
    } else {
      console.error(
        "Could not get notification data. Fetching notification from server instead."
      );
      const request = fetch(NOTIFICATION_ENDPOINT).then(function(res) {
        return res.json();
      });

      event.waitUntil(request).then(function(res) {
        // At the moment you cannot open third party URL's, a simple trick
        // is to redirect to the desired URL from a URL on your domain
        const redirectUrl = "/?redirect=" + res.notification.data.url;
        return clients.openWindow(redirectUrl);
      });
    }
  });

  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        "App is being served from cache by a service worker.\n" +
          "For more details, visit https://goo.gl/AFskqB"
      );
    },
    registered() {
      console.log("Service worker has been registered.");
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated() {
      console.log("New content is available; please refresh.");
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode."
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    }
  });
}
