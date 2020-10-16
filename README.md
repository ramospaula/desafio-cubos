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

