activate :autoprefixer
activate :imageoptim
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

  def next_product_name
    next_product_index = product_index(current_page.data.title) + 1
    next_product_index = 0 if next_product_index > data.menuElements.products.length - 1
    data.menuElements.products[next_product_index].title
  end

  def prev_product_path
    prev_product_index = product_index(current_page.data.title) - 1
    prev_product_index = data.menuElements.products.length - 1 if prev_product_index < 0
    data.menuElements.products[prev_product_index].href
  end

  def prev_product_name
    prev_product_index = product_index(current_page.data.title) - 1
    prev_product_index = data.menuElements.products.length - 1 if prev_product_index < 0
    data.menuElements.products[prev_product_index].title
  end

  def section(options, &block)
    content = "<section#{options[:id] ? " id='" + options[:id] + "'" : ""} class='section#{options[:class] ? " " + options[:class] : ""}'><div class='site-wrap'>" + capture(&block) + "</div></section>"
    concat(content)
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

erg_variants = [{
  abbr: 'ERG',
  full: 'Employee Resource Group'
}, {
  abbr: 'BRG',
  full: 'Business Resource Group'
}]

erg_variants.each do |erg_variant|
  proxy "/products/manage-#{erg_variant[:abbr].downcase}.html", "/products/manage.html", locals: { erg_variant: erg_variant, subtitle: "#{erg_variant[:abbr]} management and reporting" }, layout: "product", ignore: true
end