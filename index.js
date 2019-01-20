const babel = require('babel-core');
const run_config = require('./run-config').default;
const fs = require('fs');
const path=require('path');

const fileLocation = `./code/${run_config.to_be_transformed_file_name}.js`;

const output_file_name = run_config.output_file_name ? run_config.output_file_name : run_config.to_be_transformed_file_name;

const { code, ast } = babel.transformFileSync(fileLocation, {
  plugins: run_config.plugin_file_names.reduce((acc, plugin_file_name) => {
    
    const plugin = `./plugins/${plugin_file_name}`;
    
    if (fs.existsSync(path.join(__dirname, `/plugins/${plugin_file_name}.js`))) {
      return [
        ...acc,
        require(plugin)
      ]
    } else {
      console.warn('\x1b[31m',`plugin - ${plugin_file_name} does not exist.`, '\x1b[0m');
      return acc;
    }
  }, []),
  ast: run_config.generate_ast ? run_config.generate_ast : false,
  "presets": [
    [
      "@babel/preset-react",
    ]
  ]
});

fs.writeFileSync(`./output/transformed-${output_file_name}.js`, code);

if (!!ast) {
  fs.writeFileSync(`./output/ast-${output_file_name}.json`, JSON.stringify(ast));
}

console.log('\x1b[32m',`Transformed code saved in  - ${output_file_name}.js`, '\x1b[0m');