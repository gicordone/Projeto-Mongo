use('projeto')
db.filmes.insertMany(
[
    {Nome:'Duna', 
    Diretor:'Denis Villeuneve', 
    Elenco:'Timothee Chalamet,Rebecca Ferguson,Zendaya',
    Ano:2021,
    Premios: 0},

    {Nome:'Central do Brasil',
    Diretor:'Walter Salles',
    Elenco:'Fernanda Montenegro,Vinicius de Oliveira',
    Ano:1998,
    Premios: 20},

    {Nome:'Cidade dos Sonhos',
    Diretor:'David Lynch',
    Elenco:'Naomi Watts, Laura Helena Harring',
    Ano:2001,
    Premio: 18},

    {Nome:'king kong',
    Diretor:'Peter Jackson',
    Elenco:'Naomi Watts, Jack Black, Adrien Brody',
    Ano:2005,
    Premios: 10},

    {Nome:'Bela Vinganza',
    Diretor:'Emerald Fennel',
    Elenco:'Carey Mulligan, Bo Burnham',
    Ano:2020,
    Premios: 22},

    {Nome:'SDA: A Sociedade do Anel',
    Diretor:'Peter Jackson',
    Elenco:'Elijah Wood, Ian Mckellen, Liv Tyler',
    Ano:2001,
    Premios: 15},

    {Nome:'Shrek',
    Diretor:'Andrew Adamson, Vicky Jenson',
    Elenco:'Mike Myers,Eddie Murphy,Cameron Diaz',
    Ano:2001,
    Premios: 10},

    {Nome:'Cidade de Deus',
    Diretor:'Fernando Meirelles, Katia Luind',
    Elenco:'Alexandre Rodrigues, Leandro Firmino da Hora',
    Ano:2002,
    Premios: 15},

    {Nome:'Panico',
    Diretor:'Wes Craven',
    Elenco:'Neve Campbell,Courtney Cox,David Arquette',
    Ano:1996,
    Premios: 6}
]
) 


use('projeto')
db.filmes.find({})

// 2

use('projeto')
db.filmes.find({"Ano":{"$gt":1997,"$lt":2004}})


//3

use('projeto')
db.filmes.find(
  {$or:
    [
      {Ano: 2001},
      {Nome:/^D/}
    ]
  }
)

// 4

use('projeto')
db.filmes.find({"Diretor":{"$in":['Peter Jackson','Walter Salles']}}) 

// 5

use('projeto')
db.filmes.find(
  {$and:
    [
      {Ano:{$gte:2002,$lte:2021}},
      {Elenco:
        {$in:
          [/^Naomi Watts/, /^Carey Mulligan/]
        }
      }
    ]
  }
)

// 6
// Busque todos os filmes que não sejam entre 2001 e 2005.

use('projeto')
db.filmes.find(
  {Ano:
    {$not: 
        {$in:[2001,2005]}
    }
  }
)

// 7
// Conte quantos filmes foram lançados em 2001.

use('projeto')
db.filmes.find(
  {Ano: 2001}
).count()

// 8
// Selecione apenas o elenco numa distinct

use('projeto')
db.filmes.distinct('Elenco')

// 9
// Selecione os filmes lançados em 2001, apresentando seu nome e diretor apenas, em ordem decrescente,
// limitando a dois resultados.

use('projeto')
db.filmes.find({Ano: 2001}, {"Nome":1, "_id":0, "Diretor":1}).sort({"_id":-1}).limit(2)

// 10
// Crie uma index usando o ano como referência.

use('projeto')
db.filmes.createIndex({Ano: 1})

// 11
// Some os prêmios de todos os filmes

use('projeto')
db.filmes.aggregate(
   [
     {
      $group:
        {_id: null,  totalAmount: {$sum:'$Premios'}}
    }
   ]
)


// 12 
// Na coleção `sample_mflix` do Mongo Atlas DB, crie uma consulta que retorne os filmes com os seus
// comentários utilizando o estágio de agrupamento (e.g.: `$lookup`) 


use("sample_mflix")
db.movies.aggregate([{
$lookup:
     {
       from: "comments",
       localField: "_id",
       foreignField: "movie_id",
       as: "dados"
       }
}])








// use('projeto')
// db.filmes.deleteMany ({})