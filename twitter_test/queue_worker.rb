require 'twitter'
require 'tweetstream'
require 'redis'
require 'json'
require 'data_mapper'

redis = Redis.new
REDIS_KEY = 'tweets'

DataMapper.setup(:default, 'mysql://root:@127.0.0.1/twitter_test')
DataMapper::Property::String.length(255)

class Network
  include DataMapper::Resource

  property :id, Serial
  property :name, String
  
  has n, :conversations
  
  def to_s
    "#{name}"
  end
end

class Conversation
  include DataMapper::Resource

  property :id, Serial
  
  belongs_to :network
  has n, :tweets
end

class Tweet
  include DataMapper::Resource

  property :id, Serial
  property :text, Text
  property :from_user, String
  
  belongs_to :conversations
end

DataMapper.finalize
DataMapper.auto_upgrade!

loop do
  if redis.llen(REDIS_KEY) > 0
    popped = redis.rpop REDIS_KEY
  
    popped_obj = JSON.parse(popped)
    
    begin
      t = Tweet.new(:text => popped_obj['text'], :from_user => popped_obj['from_user'])
      t.save
    rescue Exception => e
      puts e
    end
  end
  
  sleep 0.1
end