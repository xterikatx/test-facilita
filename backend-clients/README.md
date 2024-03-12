# Backend - API Clientes Facilita

## Configuração de ambiente

#### Usada node.js ```v18.19.0``` e Postgres na versão ```16```

Antes de iniciar a API, siga estas etapas para configurar o ambiente de desenvolvimento:

1. Instalação do PostgreSQL

Certifique-se de ter o PostgreSQL instalado em seu sistema. Você pode baixar e instalar o PostgreSQL em https://www.postgresql.org/download/.




2. Configuração do Banco de Dados

No arquivo ```knexfile.js```, você encontrará as configurações do banco de dados. Certifique-se de que essas configurações correspondam à sua instância do PostgreSQL. Você pode ajustar as configurações conforme necessário para refletir o nome do usuário, a senha, o host, a porta e o nome do banco de dados que você está usando.


3. Execução de Migrações e Seeds

Após configurar o banco de dados, execute as migrações para criar as tabelas necessárias e os seeds para popular o banco de dados com dados iniciais. Para isso, execute os seguintes comandos no terminal:

> npx knex migrate:latest

> npx knex seed:run

### Algoritmo para calcular rota otimizada foi baseado em:

[Chebyshev Distance](https://www.sciencedirect.com/topics/computer-science/chebyshev-distance)

[Measuring Distance](https://chris3606.github.io/GoRogue/articles/grid_components/measuring-distance.html#:~:text=The%20Chebyshev%20distance%20calculation%2C%20commonly,y1%2C%20x2%20%2D%20x1)

[O que é e como funciona o algoritmo KNN?](https://didatica.tech/o-que-e-e-como-funciona-o-algoritmo-knn/)



### Notas sobre uso do Knex

> O Knex é um construtor de consultas SQL para Node.js e pode ser usado para criar consultas SQL diretamente em seu código, sem a necessidade de um ORM.Ele simplifica a interação com o banco de dados e oferece métodos para criar, consultar, atualizar e excluir registros no banco de dados de forma programática, sem a necessidade de escrever consultas SQL manualmente.
Veja mais em: [How is Node.js Knex similar/different to Sequelize?](https://stackoverflow.com/questions/56028287/how-is-node-js-knex-similar-different-to-sequelize)
