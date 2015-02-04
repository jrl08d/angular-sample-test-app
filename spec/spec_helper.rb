require 'rspec'
require 'capybara'
require 'capybara-webkit'

RSpec.configure do |config|
  config.include Capybara::DSL
  
  config.expect_with :rspec do |c|
    c.syntax = :should
  end
  
  config.mock_with :rspec do |c|
    c.syntax = :should
  end
  
  config.before(:suite) do
    puts 'Starting server...'
    start_server
  end
  
  config.after(:suite) do
    puts ''
    puts 'Killing server...'
    kill_server
  end
end

Capybara.configure do |config|
  config.javascript_driver = :webkit
  config.current_driver = :webkit
  config.app_host = 'http://127.0.0.1:8000'
  config.run_server = false
end

def start_server
  server_job = fork do
    system "python -m SimpleHTTPServer &>/dev/null"
  end
  
  Process.detach(server_job)
end

def kill_server
  system "killall -9 python"
end
