"use strict";
import { useRef, useState } from "react";
import { randomString } from "./global";

type Player = {
  id: string;
  wallet: number;
  name: string;
  bet: string;
  disabled: boolean;
};

export default function App() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [defautWallet, setDefautlWallet] = useState("1500");
  const [rate, setRate] = useState(2);
  const [turn, setTurn] = useState<number>(0);

  const nameRef = useRef<HTMLInputElement>(null);

  const addPlayer = () => {
    const wallet = parseInt(defautWallet);
    const name = nameRef.current!.value;
    if (name === "") return;
    setPlayers([
      ...players,
      {
        id: randomString(32),
        name,
        wallet,
        bet: "",
        disabled: false,
      },
    ]);

    nameRef.current!.value = "";
  };

  const addBet = (betVal: string, id: string) => {
    const players2 = [...players];
    players2.find((play) => play.id === id)!.bet = betVal;
    setPlayers(players2);
  };

  const confirmBtn = (id: string) => {
    const newPlayers = [...players];
    const player = newPlayers.find((player) => player.id === id)!;
    player.disabled = true;

    const becomeWallet = player.wallet - Number(player.bet);

    if (becomeWallet < 0) throw new Error("Money cannot be negative number!!");

    player.wallet = becomeWallet;

    setPlayers(newPlayers);
  };

  const fight = (isWin: boolean) => {
    const newPlayers = [...players];
    const current = newPlayers[turn];
    if (isWin) {
      current.wallet = Number(current.wallet) + Number(current.bet) * rate;
    }

    current.bet = "0";
    current.disabled = false;

    setPlayers(newPlayers);

    setTurn((turn) => {
      if (!players.includes(players[turn + 1])) {
        return 0;
      } else {
        return turn + 1;
      }
    });
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-center p-2 m-2'>Bet Maneger</h1>
      <section id='defaut'>
        <div className='p-2 text-center'>
          <label className='text-xl p-2 m-2'>Defaut Wallet</label>
          <input
            className='text-xl text-green-300 shadow max-w-32 p-1 bg-blue-700'
            type='number'
            value={defautWallet}
            onChange={(e) => setDefautlWallet(e.target.value)}
          />
        </div>
        <div className='p-2 text-center'>
          <label className='text-xl p-2 m-2'>Rate</label>
          <input
            className='text-xl bg-red-400 shadow max-w-32 p-1 text-yellow-100'
            type='number'
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
      </section>

      <section className='flex flex-col justify-center items-center'>
        <div>
          <label className='text-2xl'>Your Name</label>
          <input
            className='p-2 m-3 text-xl border-2 rounded border-black'
            type='text'
            ref={nameRef}
          />
        </div>
        <button
          className='text-xl font-medium p-2 m-3 w-36 shadow-md active:shadow-none'
          onClick={addPlayer}>
          Add Player
        </button>
      </section>
      <ul id='players'>
        {players.map(({ id, wallet, bet, name, disabled }) => (
          <li key={id} className='flex flex-col justify-center items-center'>
            <div className='flex items-center justify-center text-yellow-700'>
              <span className='text-xl text-black p-2 m-1'>
                <span className='font-bold'>{name}</span> 's wallet:
              </span>
              <span className='text-2xl p-1'>{wallet}</span>
            </div>
            <div className='flex items-center justify-center font-bold text-red-600'>
              <label className='text-xl p-2 m-1'>Bet:</label>
              <input
                className='text-2xl p-1 border-2 rounded'
                type='number'
                value={bet}
                onChange={(e) => addBet(e.target.value, id)}
                disabled={disabled}
              />
            </div>
            <button
              className='text-xl font-medium p-2 m-3 w-36 shadow-md active:shadow-none'
              onClick={() => confirmBtn(id)}>
              CONFIRM
            </button>
          </li>
        ))}
      </ul>
      {players[0] ? (
        <div className='text-center text-xl p-2 m-3'>
          TURN OF <span className='font-bold'>{players[turn].name}</span>
        </div>
      ) : (
        <div></div>
      )}

      <section className='flex justify-center items-center p-2 text-xl font-bold'>
        <button
          className='bg-red-600 border-2 border-red-600 text-white w-20 h-10 m-3 mx-5 hover:bg-white hover:text-red-600 shadow-lg active:shadow-none'
          onClick={() => fight(true)}>
          WIN
        </button>
        <button
          className='bg-blue-600 border-2 border-blue-600 text-white w-20 h-10 m-5 hover:bg-white hover:text-blue-600 shadow-lg active:shadow-none'
          onClick={() => fight(false)}>
          LOSE
        </button>
      </section>
    </div>
  );
}
