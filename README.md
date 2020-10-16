## desafio-cubos - backend

desafio feito pela empresa cubos durante o processo seletivo da vaga de desenvolvimento back-end

## Instalações

```bash
npm install express
npm install @types/express -D
npm install typescript -D
npm install ts-node-dev -D
npm install date-fns
```

## Run Project

```bash
npm run dev
```

## Endpoints:

### todos os Endpoints foram feitos utilizando a plataforma insomnia para fazer as requisições.

## Cadastro de regra de atendimento

### dia específico

```bash
### exemplo para o body da requisição
{
  "ruleType":"Specific Day",
  "day":"10/25/2020",
  "intervals":[
    {
      "start":"9:30",
      "end":"10:20"
    },
    {
      "start":"10:30",
      "end":"11:00"
    }
  ]
}
```

### semanalmente

```bash
### exemplo para o body da requisição
{
  "ruleType":"Weekly",
  "weekDay":[1, 2],
  "intervals":[
    {
      "start":"15:00",
      "end":"15:30"
    }
  ]
}
```

### diariamente

```bash
### exemplo para o body da requisição
{
  "ruleType":"Daily",
  "intervals":[
    {
      "start":"12:00",
      "end":"12:30"
    }
   ]
 }
```

## Apagar regras

Deve ser inserido o id da regra listada no arquivo rules.json na raiz do projeto

```bash
DELETE http://localhost:3333/rules/:id
```

## Listar regras

```bash
GET http://localhost:3333/rules
```

## Horários disponíveis

```bash
GET http://localhost:3333/schedules
```
Na Query da consulta deve esta presente as datas dos intervalos com start(data inicial) e end(data final)

```bash
### Exemplo para a query da requisição
start = 10/24/2020
end = 10/26/2020
```
A URL PREVIEW do exemplo deverá ficar assim: http://localhost:3333/schedules?start=10%2F24%2F2020&end=10%2F26%2F2020


