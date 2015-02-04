require 'spec_helper'

describe 'Eggly' do

  it 'should allow filtering by category' do
    visit '/index.start.html#/'
    
    main = page.find('.main')
    main.should_not have_content("Design")
    
    click_link('Design')
    main.should have_content("Design")
  end
  
end
