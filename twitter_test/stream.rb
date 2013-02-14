require 'twitter'
require 'tweetstream'
require 'redis'
require 'json'

redis = Redis.new
REDIS_KEY = 'tweets'

TweetStream.configure do |config|
  config.consumer_key       = 'ziSPylsn6R5JTEYNjG85VA'
  config.consumer_secret    = 'qMdJuk4yeIpnGAxJaH4ZT78yWxHjPNf7Ho5Qw3jLLoQ'
  config.oauth_token        = '414909499-0kUQ80Jn4jFPhwN3oiVf4ZmAMzAh73cAGxK9l1df'
  config.oauth_token_secret = 'kxPe9KTKuk3Ve7ssOI5NbSEAXsKErgEhqcu3YeidY'
  config.auth_method        = :oauth
end

TweetStream::Client.new.track('nemo') do |status|
  tweet = Hash.new
  
  tweet['text'] = status.text
  tweet['from_user'] = status.from_user
  
  redis.lpush REDIS_KEY, tweet.to_json
end