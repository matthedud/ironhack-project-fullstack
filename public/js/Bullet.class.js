const bulletVelocity = 9
const bulletSize = 3

class Bullet {
	constructor(player, id, position) {
		this.position = { x: position.x, y: position.y, direction: position.direction }
		this.player = player
		this.id = id
	}
	draw(xOffset, yOffset) {
		ctx.fillStyle = colors.bullet
		ctx.beginPath()
		ctx.arc(this.xPosition + xOffset, this.yPosition  + yOffset, bulletSize, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.fill()
		ctx.stroke()
	}
	move(game) {
		const newXposition =
			this.position.x + Math.cos(this.direction) * bulletVelocity
		const newYposition =
			this.position.y + Math.sin(this.direction) * bulletVelocity
        const player = game.isPlayer(newXposition, newYposition)
		if (!player && !game.isWall(newXposition, newYposition)) {
			this.position.x = newXposition
			this.position.y = newYposition
			setTimeout(() => {
				if (this) this.move(game)
			}, 30)
		} else {
			const bulletIndex = game.bullets.findIndex(
				(el) => (el.id = this.id)
			)
			game.bullets.splice(bulletIndex, 1)
		}
	}
}