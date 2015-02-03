require 'capybara'
require 'rspec'
require 'capybara-webkit'
commands = []

commands << "cd ~/Documents/egghead-angularjs-from-scratch-getting-started/;"
commands << "python -m SimpleHTTPServer &"

system commands.join(' ')

sleep 40

puts 'Start testing!'

session = Capybara::Session.new(:webkit)
session.visit "http://127.0.0.1:8000/index.start.html#/"
sleep 2
main = session.find('.main')


if session.has_content?("Development")
  puts "First check is good!"
else
  puts "Not found, first check could be broken"
end


session.click_link('Design')

if main.has_content?("Design")
  puts "Second check is good!"
else
  puts "Not found, second check could be broken"
end

system "killall -9 python"