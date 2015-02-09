describe('angularjs homepage', function() {

  beforeEach(function(){
  	browser.get('http://127.0.0.1:8000/index.start.html#/');
  });

  it('should have a title', function() {

    expect(browser.getTitle()).toEqual('Eggly');
  });

  it('should allow navigation of categories', function() {
  	element.all(by.css('.nav-sidebar li')).then(function(categories) {
  		expect(categories.length).toBe(4);
  		expect(categories[1].getText()).toBe('Design');
  		(categories[1].getText()).click();
  		expect(element(by.css('.main h1')).getText()).toBe('Design');

  	});
  });
});