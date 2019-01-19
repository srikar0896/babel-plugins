const babel = require('babel-core');
const run_config = require('./run-config').default;
const fs = require('fs');

const plugin = require(`./plugins/${run_config.plugin_file_name}`);
const fileLocation = `./code/${run_config.to_be_transformed_file_name}.js`;

const output_file_name = run_config.output_file_name ? run_config.output_file_name : run_config.to_be_transformed_file_name;

const { code, ast } = babel.transformFileSync(fileLocation, {
  plugins: [plugin],
  ast: run_config.generate_ast ? run_config.generate_ast : false,
  "presets": [
    [
      "@babel/preset-react",
    ]
  ]
});

fs.writeFileSync(`./output/transformed-${output_file_name}.js`, code);

if (!!ast) {
  fs.writeFileSync(`./output/ast-${output_file_name}.js`, JSON.stringify(ast));
}
