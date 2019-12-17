desc 'Start containers'
task :up do
  sh "docker-compose up --build -d"
  sh "while [ \"$(docker inspect -f '{{json .State.Health.Status}}' ps_stack_db)\" != '\"healthy\"' ]; do sleep 1; done"
  sh "yarn start:all"
end

desc 'Tear down containers'
task :down do
  sh "docker-compose down || true"
end

desc 'Bash into db container'
task :bash_db do
  sh "docker exec -it ps_stack_db bash"
end

desc 'Show db container logs'
task :logs_db do
  sh "docker logs -f ps_stack_db"
end

desc 'Show Adminer container logs'
task :logs_adminer do
  sh "docker logs -f ps_stack_adminer"
end

desc 'Run tests'
task :test do
  sh "yarn test"
end

desc 'Run tests with coverage report'
task :coverage do
  sh "yarn coverage"
end

desc 'Run e2e tests'
task :e2e do
  sh "yarn e2e"
end

desc 'Run linter'
task :lint do
  sh "yarn lint"
end

desc 'Run linter fix'
task :lint_fix do
  sh "yarn lint-fix"
end

desc 'Run Prettier'
task :prettier do
  sh "yarn prettier"
end

desc 'Run Prettier fix'
task :prettier_fix do
  sh "yarn prettier-fix"
end

desc 'Update compodoc documentation'
task :doc do
  sh "yarn compodoc"
end

desc 'Generate translation files'
task :generate_locales do
  sh "yarn locales"
end
