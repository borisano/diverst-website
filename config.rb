activate :autoprefixer
#activate :imageoptim
activate :minify_html

require "lib/image_helpers"
helpers ImageHelpers

after_configuration do
	@bower_config = JSON.parse(IO.read("#{root}/.bowerrc"))
	sprockets.append_path File.join "#{root}", @bower_config["directory"]
end

helpers do
  def product_index(product_title)
    products = data.menuElements.products
    products.index{ |p| p.title == product_title }
  end

  def next_product_path
    next_product_index = product_index(current_page.data.title) + 1
    next_product_index = 0 if next_product_index > data.menuElements.products.length - 1
    data.menuElements.products[next_product_index].href
  end

  def prev_product_path
    prev_product_index = product_index(current_page.data.title) - 1
    prev_product_index = data.menuElements.products.length - 1 if prev_product_index < 0
    data.menuElements.products[prev_product_index].href
  end
end

activate :livereload

activate :directory_indexes

set :css_dir, 'styles'
set :js_dir, 'scripts'
set :images_dir, 'images'
set :partials_dir, 'partials'

configure :build do
	activate :minify_css
	activate :minify_javascript
	activate :asset_hash
end

activate :deploy do |deploy|
  deploy.method = :git
  deploy.build_before = true
end

page '/index.html', :layout => false