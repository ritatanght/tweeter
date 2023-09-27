/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/**
 * Takes a tweet object and generate a new HTML element
 * @param {object} tweetObject
 * @returns jquery element
 */
const createTweetElement = (tweetObject) => {
  const { user, content, created_at } = tweetObject;
  const $tweet = $(`
  <article class="tweet">
    <header>
      <div>
        <img src="${user.avatars}" alt="avatar" />
        <p>${user.name}</p>
      </div>
      <p class="handle">${user.handle}</p>
    </header>
    <p class='content'></p>
    <footer>
      <p class="create-time">${timeago.format(created_at)}</p>
      <div class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-repeat"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  $tweet.children(".content").text(content.text);
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
    const $tweet = createTweetElement(tweet);
    // takes return value and prepend it to the tweets container to make it as the first child
    $("#tweets-container").prepend($tweet);
  }
};

// jQuery document ready
$(document).ready(() => {
  /**
   * make a request to /tweets and receive the array of tweets as JSON
   * call renderTweets to render the tweets to the DOM
   */
  const loadTweets = () => {
    $.get("/tweets", (tweets) => renderTweets(tweets)).catch((error) =>
      console.log(error)
    );
  };

  loadTweets();

  // form data submission
  $("form").submit(function (event) {
    event.preventDefault();
    // move up the error message div before each submission
    const $errorDiv = $("#error");
    $errorDiv.slideUp("fast");

    // Knowing that our form only has 1 text field, we can immediately extract the input
    let text = $(this).serialize().replace("text=", "");

    // decode the query string
    text = decodeURIComponent(text);

    // disallow tweet content to be empty or exceeds 140 characters, show corresponding error message
    if (!text) {
      $errorDiv.slideDown("fast", function () {
        $(this).children("p").text("Your tweet is empty.");
      });
      return;
    } else if (text.length > 140) {
      $errorDiv.slideDown("fast", function () {
        $(this)
          .children("p")
          .text("Too long! Please keep it under 140 characters.");
      });
      return;
    }

    $.post("/tweets", { text }, () => {
      // once the tweets is successfully posted, clear the textarea and trigger a change event
      $(this).find("textarea").val("").change();

      /**
       * Append only the tweet just posted to the begining of the tweets list
       * renderTweets takes in an array, so wrapping it in an array is neccessary
       * For this project we are not touching the backend, otherwise I would send the posted data from the backend
       *      instead of fetching all the tweets and extracting only the latest tweet
       */
      const loadSubmittedTweet = () => {
        $.get("/tweets", (tweets) => renderTweets([tweets[tweets.length - 1]]));
      };
      loadSubmittedTweet();
    }).catch((error) => console.log(error));
  });
});
