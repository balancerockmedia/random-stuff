require 'twitter'
require 'tweetstream'
require 'redis'
require 'json'

redis = Redis.new
REDIS_KEY = 'tweets'

TweetStream.configure do |config|
  config.consumer_key       = ''
  config.consumer_secret    = ''
  config.oauth_token        = ''
  config.oauth_token_secret = ''
  config.auth_method        = :oauth
end

TweetStream::Client.new.track('nemo') do |status|
  tweet = Hash.new
  
  tweet['text'] = status.text
  tweet['from_user'] = status.from_user
  
  redis.lpush REDIS_KEY, tweet.to_json
end
