/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// sample tweets data
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

/**
 * Takes a tweet object and generate a new HTML element
 * @param {object} tweetObject
 * @returns jquery element
 */
const createTweetElement = (tweetObject) => {
  const { user, content, created_at } = tweetObject;
  const $tweet = $(`<article class="tweet">
  <header>
            <div>
              <img src="${user.avatars}" alt="avatar" />
              <p>${user.name}</p>
            </div>
            <p class="handle">${user.handle}</p>
          </header>
          <p>
            ${content.text}
          </p>
          <footer>
            <p class="create-time">${timeago.format(created_at)}</p>
            <div class="tweet-icons">
              <i class="fa-solid fa-flag"></i>
              <i class="fa-solid fa-repeat"></i>
              <i class="fa-solid fa-heart"></i>
            </div>
          </footer>
  </article>`);
  return $tweet;
};

/**
 * Takes in an array of tweet objects and append each one to the #tweets-container using jQuery
 * @param {array} tweets
 * @returns undefined
 */
const renderTweets = (tweets) => {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").append($tweet);
  }
};

// jQuery
$(document).ready(() => {
  // form data submission
  $("form").submit(function (event) {
    event.preventDefault();
    const [key, val] = $(this).serialize().split("=");
    const data = { [key]: val };

    $.post("/tweets", data, () => {
      console.log("Posted");
    });
  });

  //use jQuery to make a request to /tweets and receive the array of tweets as JSON
  const loadTweets = () => {
    $.get("/tweets", (tweets) => {
      renderTweets(tweets);
    });
  };
  loadTweets();
});
