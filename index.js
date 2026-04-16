const players = [
  {
    NOME: "Soluço",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 5,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Astrid",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  {
    NOME: "Melequento",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 3,
    PODER: 5,
    PONTOS: 0,
  },
  {
    NOME: "Cabeças dura e quente",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  }
];

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return "RETO";
  if (random < 0.66) return "CURVO";
  return "CONFRONTO";
}

function logRollResult(name, type, dice, attr) {
  console.log(`${name} 🎲 ${type}: ${dice} + ${attr} = ${dice + attr}`);
}

async function playRaceEngine(players) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 Rodada ${round}`);

    const block = getRandomBlock();
    console.log(`Circulo em fogo: ${block}`);

    let results = [];

    // TESTES (reta ou curva)
    if (block === "RETO" || block === "CURVO") {
      const atributo = block === "RETA" ? "VELOCIDADE" : "MANOBRABILIDADE";

      for (let player of players) {
        let dice = rollDice();
        let total = dice + player[atributo];

        logRollResult(player.NOME, atributo.toLowerCase(), dice, player[atributo]);

        results.push({ player, total });
      }

      // descobrir vencedor da rodada
      let max = Math.max(...results.map(r => r.total));
      let winners = results.filter(r => r.total === max);

      winners.forEach(w => {
        console.log(`${w.player.NOME} marcou um ponto!`);
        w.player.PONTOS++;
      });
    }

    // CONFRONTO (todos contra todos)
    if (block === "CONFRONTO") {
      for (let i = 0; i < players.length; i++) {
        for (let j = i + 1; j < players.length; j++) {
          let p1 = players[i];
          let p2 = players[j];

          let d1 = rollDice();
          let d2 = rollDice();

          let total1 = d1 + p1.PODER;
          let total2 = d2 + p2.PODER;

          console.log(`\n${p1.NOME} 🥊 ${p2.NOME}`);

          logRollResult(p1.NOME, "poder", d1, p1.PODER);
          logRollResult(p2.NOME, "poder", d2, p2.PODER);

          if (total1 > total2 && p2.PONTOS > 0) {
            p2.PONTOS--;
            console.log(`${p1.NOME} venceu! ${p2.NOME} perdeu 1 ponto`);
          } else if (total2 > total1 && p1.PONTOS > 0) {
            p1.PONTOS--;
            console.log(`${p2.NOME} venceu! ${p1.NOME} perdeu 1 ponto`);
          } else {
            console.log("Empate!");
          }
        }
      }
    }

    console.log("\n-------------------------");
  }
}

function declareWinner(players) {
  console.log("\n🏁 Resultado final:");

  players.forEach(p => {
    console.log(`${p.NOME}: ${p.PONTOS} ponto(s)`);
  });

  let max = Math.max(...players.map(p => p.PONTOS));
  let winners = players.filter(p => p.PONTOS === max);

  if (winners.length === 1) {
    console.log(`\n🏆 ${winners[0].NOME} venceu!`);
  } else {
    console.log("\nEmpate entre:");
    winners.forEach(w => console.log(w.NOME));
  }
}

(async function main() {
  console.log("🏁🚨 Corrida começando...\n");

  await playRaceEngine(players);
  declareWinner(players);
})();
