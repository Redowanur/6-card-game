import { useEffect, useState } from "react"

const App = () => {
	const [numbers, setNumbers] = useState<number[][]>([]);
	const [selectedCards, setSelectedCards] = useState<number[]>([]);
	const [ans, setAns] = useState<number>(0);
	const [finish, setFinish] = useState(false);
	const year = new Date().getFullYear();

	useEffect(() => {
		const nums: number[][] = Array.from({ length: 6 }, () => []);
		let i = 0;

		for (let start = 1; start <= 32; start *= 2) {
			let cnt = 0;
			let j = start;
			while (j <= 63) {
				if (cnt < start) {
					nums[i].push(j);
					cnt++;
					j++;
				}
				else {
					j += cnt;
					cnt = 0;
				}
			}
			i++;
		}
		setNumbers(nums);
	}, []);

	const toggleCard = (id: number) => {
		setAns(prev => prev + numbers[id][0]);
		setSelectedCards(prev =>
			prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
		);
	};

	return (
		<div className="max-w-7xl mx-auto p-5 ">
			<div className={`flex flex-col justify-center items-center ${finish && 'hidden'} `}>
				<p className="text-5xl uppercase font-bold text-emerald-400">6 card game</p>
				<p className="text-2xl text-gray-600 mb-8 mt-2 text-center">Think of a number between 1 to 60. Select all the cards that contain the number</p>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
					{
						numbers.map((nums, id) =>
							<div key={id} className={`${selectedCards.includes(id) ? "bg-green-300" : "bg-white"} p-4 w-fit shadow rounded-xl transition-all duration-300 transform hover:scale-103`} onClick={() => toggleCard(id)} >
								<p className="text-2xl font-bold border-b border-b-gray-200 mb-2 pb-1">Card no {id + 1}</p>
								<div className="grid grid-cols-6 gap-x-10 gap-y-5">
									{nums.map(num =>
										<p key={num} className="text-2xl">{num}</p>
									)}
								</div>
							</div>
						)
					}
				</div>
				<p className="text-2xl my-5">Are you done selecting cards?</p>
				<button className="bg-emerald-400 text-white text-lg font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-103 cursor-pointer mb-8" onClick={() => setFinish(true)} >Yes</button>
			</div>
			<div className={`min-h-[90vh] flex flex-col justify-center items-center ${!finish && 'hidden'}`}>
				<p className="text-3xl">Your number is</p>
				<p className="text-8xl font-bold">{ans}</p>
				<p className="text-xl mt-10 mb-2">Do you want to play again?</p>
				<button className="bg-emerald-400 text-white text-lg font-semibold py-3 px-5 rounded-xl transition-all duration-300 transform hover:scale-103 cursor-pointer" onClick={() => {
					setFinish(false);
					setSelectedCards([]);
					setAns(0);
				}} >Yes</button>

			</div>
			<div className="text-center border-t-2 border-t-black/60 py-3 text-gray-800 text-sm tracking-wide">
				© {year} Redowanur Rahman - All rights reserved
			</div>

		</div>
	)
}

export default App