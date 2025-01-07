document.addEventListener('DOMContentLoaded', () => {
	const currentStats = {
		unique: 'Показатель атаки +20',
		first: 'Пауза между атаками -0.05 сек',
		second: 'Максимальная физическая атака +106',
	}

	let ludCount = 0
	let entireCount = 0

	const repeat = document.querySelector('.repeat')
	const change = document.querySelector('.change')

	const chudPrice = document.querySelector('.chudPrice')
	const mirPrice = document.querySelector('.mirPrice')

	const currentCount = document.querySelector('.currentCount')
	const entirePrice = document.querySelector('.entirePrice')
	const clear = document.querySelector('.clear ')

	const uniqueCurrent = document.querySelector('.uniqueCurrent')
	const firstCurrent = document.querySelector('.firstCurrent')
	const secondCurrent = document.querySelector('.secondCurrent')

	const uniqueNew = document.querySelector('.uniqueNew')
	const firstNew = document.querySelector('.firstNew')
	const secondNew = document.querySelector('.secondNew')

	repeat.addEventListener('click', () => {
		const newStats = ludka()

		uniqueNew.innerHTML = newStats.unique
		firstNew.innerHTML = newStats.first
		secondNew.innerHTML = newStats.second

		ludCount++
		currentCount.innerHTML = ludCount

		entireCount += Number(chudPrice.value * 7) + Number(mirPrice.value)
		entirePrice.innerHTML = entireCount
	})

	change.addEventListener('click', () => {
		uniqueCurrent.innerHTML = uniqueNew.innerHTML
		firstCurrent.innerHTML = firstNew.innerHTML
		secondCurrent.innerHTML = secondNew.innerHTML
	})

	clear.addEventListener('click', () => {
		ludCount = 0
		entireCount = 0
		currentCount.innerHTML = ludCount
		entirePrice.innerHTML = entireCount

		uniqueNew.innerHTML = '-'
		firstNew.innerHTML = '-'
		secondNew.innerHTML = '-'

		uniqueCurrent.innerHTML = currentStats.unique
		firstCurrent.innerHTML = currentStats.first
		secondCurrent.innerHTML = currentStats.second
	})
})

const ludka = () => {
	const unique = getClosest(uniqueStats, 4, false)

	const first = getClosest(commonStats, 3)

	const second = getClosest(commonStats, 6)

	return {unique, first, second}
}

const uniqueStats = [
	{
		'name': 'Вероятность критического удара +3%',
		'chance': 46.5
	},
	{
		'name': 'Вероятность критического удара +4%',
		'chance': 2.5
	},
	{
		'name': 'Жестокий воин: определенный шанс нанести двойной урон, теряя при этом 5% от вашего максимального запаса здоровья.',
		'chance': 46.5
	},
	{
		'name': 'Яростный бог войны: с высокой вероятностью позволяет нанести противнику двойной урон ценой 5% максимального запаса здоровья.',
		'chance': 2.5
	},
	{
		'name': 'Показатель атаки +20',
		'chance': 2
	},
]

const commonStats = [
	{
		'name': 'Максимальная физическая атака +106',
		'chance': 5
	},
	{
		'name': 'Максимальная физическая атака +130',
		'chance': 5
	},
	{
		'name': 'Пауза между атаками -0.05 сек',
		'chance': 5
	},
	{
		'name': 'Дальность +1',
		'chance': 9
	},
	{
		'name': 'Здоровье +350',
		'chance': 10
	},
	{
		'name': 'Сила +18~19',
		'chance': 10
	},
	{
		'name': 'Ловкость +18~19',
		'chance': 10
	},
	{
		'name': 'Интеллект +18~19',
		'chance': 10
	},
	{
		'name': 'Выносливость +18~19',
		'chance': 10
	},
	{
		'name': 'Вероятность критического удара +1%',
		'chance': 9.5
	},
	{
		'name': 'Вероятность критического удара +2%',
		'chance': 0.5
	},
	{
		'name': 'Меткость +30%',
		'chance': 4
	},
	{
		'name': 'Показатель атаки +1',
		'chance': 9
	},
	{
		'name': 'Показатель атаки +2',
		'chance': 1
	},
	{
		'name': 'Показатель атаки +3',
		'chance': 1
	},
	{
		'name': 'Показатель защиты +2',
		'chance': 1
	},
]

const getClosest = (stats, randCount, common = true) => {
	let dop = 101
	let comm = 31
	const rand = random(0, common ? comm : dop, randCount)

	let closestNameUp = ''
	let closestNameDown = ''
	let closestChanceUp = 0
	let closestRealChanceUp = 0
	let closestChanceDown = dop
	let closestRealChanceDown = dop
	let upEqual = []
	let downEqual = []

	stats.forEach(e => {
		if(e.chance - rand > 0 && e.chance - rand < closestChanceUp) {
			closestNameUp = e.name
			closestChanceUp = e.chance - rand
			closestRealChanceUp = e.chance
		}

		if(closestRealChanceUp == e.chance) {
			upEqual.push(e.name)
		}
	})

	if(upEqual.length > 1) {
		const upRand = random(0, upEqual.length - 1, 3, false)
		closestNameUp = upEqual[upRand]
	}

	stats.forEach(e => {
		if(rand - e.chance > 0 && rand - e.chance < closestChanceDown) {
			closestNameDown = e.name
			closestChanceDown = rand - e.chance
			closestRealChanceDown = e.chance
		}
		
		if(closestRealChanceDown == e.chance) {
			downEqual.push(e.name)
		}
	})

	if(downEqual.length > 1) {
		const downRand = random(0, downEqual.length - 1, 4, false)
		closestNameUp = downEqual[downRand]
	}

	return closestNameUp > closestNameDown ? closestNameUp : closestNameDown
}

function random(min, max, randCount, isFixed = true) {
	let randomValue = 0
	let del = randCount

	for(i = 0; i < randCount; i++) {
		randomValue += Math.random()
	}

	const adjustedRandomValue = randomValue / del

	if(isFixed)
		return (min + adjustedRandomValue * (max - min)).toFixed(1)
	else 
		return (min + adjustedRandomValue * (max - min)).toFixed(0)
}
