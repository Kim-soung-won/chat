'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Box, Typography, Button, Paper, useTheme } from '@mui/material'
import { Cat, Trophy } from 'lucide-react'
import Matter from 'matter-js'

const CAT_LEVELS = [
  { level: 0, radius: 15, color: '#FFDDC1', score: 1, iconSize: 24 },
  { level: 1, radius: 20, color: '#FFC2B4', score: 2, iconSize: 32 },
  { level: 2, radius: 28, color: '#FFB2A6', score: 4, iconSize: 46 },
  { level: 3, radius: 35, color: '#FFA8A8', score: 8, iconSize: 60 },
  { level: 4, radius: 45, color: '#FF8A8A', score: 16, iconSize: 78 },
  { level: 5, radius: 55, color: '#FF6B6B', score: 32, iconSize: 96 },
  { level: 6, radius: 68, color: '#D65A5A', score: 64, iconSize: 120 },
  { level: 7, radius: 80, color: '#A94747', score: 128, iconSize: 144 },
  { level: 8, radius: 95, color: '#7C3A3A', score: 256, iconSize: 170 },
  { level: 9, radius: 110, color: '#5A2B2B', score: 512, iconSize: 200 },
  { level: 10, radius: 130, color: '#3A1A1A', score: 1024, iconSize: 240 },
]

const GAME_WIDTH = 600
const GAME_HEIGHT = 700
const GAME_OVER_LINE_Y = 100

// --- 1. React 렌더링을 위한 고양이 객체 타입 정의 ---
interface RenderableCat {
  id: number
  x: number
  y: number
  angle: number
  level: number
}

export default function SuikaCatGamePage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const engineRef = useRef<Matter.Engine | null>(null)
  const runnerRef = useRef<Matter.Runner | null>(null)

  const [score, setScore] = useState(0)
  const [nextCatLevel, setNextCatLevel] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [indicatorX, setIndicatorX] = useState(GAME_WIDTH / 2)
  const [isDropping, setIsDropping] = useState(false)

  const isDark = useTheme().palette.mode === 'dark'

  // --- 2. 물리 엔진의 상태를 React 렌더링용 state로 동기화 ---
  const [renderableCats, setRenderableCats] = useState<RenderableCat[]>([])

  useEffect(() => {
    const { Engine, Runner, World, Bodies, Events } = Matter
    const engine = Engine.create({ gravity: { y: 0.9 } })
    engineRef.current = engine

    const wallOptions = { isStatic: true, render: { visible: false } }
    World.add(engine.world, [
      Bodies.rectangle(
        GAME_WIDTH / 2,
        GAME_HEIGHT - 25,
        GAME_WIDTH,
        50,
        wallOptions,
      ),
      Bodies.rectangle(10, GAME_HEIGHT / 2, 20, GAME_HEIGHT, wallOptions),
      Bodies.rectangle(
        GAME_WIDTH - 10,
        GAME_HEIGHT / 2,
        20,
        GAME_HEIGHT,
        wallOptions,
      ),
    ])

    const runner = Runner.create()
    runnerRef.current = runner
    Runner.run(runner, engine)

    // --- 4. 렌더링 루프 설정 ---
    let animationFrameId: number
    const renderLoop = () => {
      const bodies = Matter.Composite.allBodies(engine.world)
      const catsToRender: RenderableCat[] = bodies
        .filter((body) => body.label.startsWith('cat-'))
        .map((body) => ({
          id: body.id,
          x: body.position.x,
          y: body.position.y,
          angle: body.angle,
          level: parseInt(body.label.split('-')[1]),
        }))
      setRenderableCats(catsToRender)
      animationFrameId = requestAnimationFrame(renderLoop)
    }
    renderLoop()

    // 충돌 감지 이벤트 설정
    Events.on(engine, 'collisionStart', (event) => {
      for (const pair of event.pairs) {
        const { bodyA, bodyB } = pair
        if (bodyA.label === bodyB.label && bodyA.label.startsWith('cat-')) {
          const level = parseInt(bodyA.label.split('-')[1])
          if (level < CAT_LEVELS.length - 1) {
            World.remove(engine.world, [bodyA, bodyB])
            const newLevel = level + 1
            const newCatInfo = CAT_LEVELS[newLevel]
            const newCat = Bodies.circle(
              (bodyA.position.x + bodyB.position.x) / 2,
              (bodyA.position.y + bodyB.position.y) / 2,
              newCatInfo.radius,
              { label: `cat-${newLevel}`, restitution: 0.3 },
            )
            World.add(engine.world, newCat)
            setScore((s) => s + newCatInfo.score)
          }
        }
      }
    })

    // 게임 오버 체크
    Events.on(engine, 'afterUpdate', () => {
      for (const body of engine.world.bodies) {
        if (
          !body.isStatic &&
          body.label.startsWith('cat-') &&
          body.position.y -
            CAT_LEVELS[parseInt(body.label.split('-')[1])].radius <
            GAME_OVER_LINE_Y
        ) {
          if (!body.isSleeping) {
            setTimeout(() => {
              if (
                body.position.y -
                  CAT_LEVELS[parseInt(body.label.split('-')[1])].radius <
                  GAME_OVER_LINE_Y &&
                !body.isSleeping
              ) {
                setGameOver(true)
                if (runnerRef.current) Runner.stop(runnerRef.current)
              }
            }, 5000)
          }
        }
      }
    })

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (runnerRef.current) Runner.stop(runnerRef.current)
      World.clear(engine.world, false)
      Engine.clear(engine)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameOver || isDropping) return
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      let x = e.clientX - rect.left
      const catRadius = CAT_LEVELS[nextCatLevel].radius
      x = Math.max(catRadius + 10, Math.min(x, GAME_WIDTH - catRadius - 10))
      setIndicatorX(x)
    }
  }

  const handleDropCat = () => {
    if (gameOver || isDropping) return
    setIsDropping(true)
    const { Bodies, World } = Matter
    const catInfo = CAT_LEVELS[nextCatLevel]

    const newCat = Bodies.circle(indicatorX, 50, catInfo.radius, {
      label: `cat-${catInfo.level}`,
      restitution: 0.3,
    })

    if (engineRef.current) {
      World.add(engineRef.current.world, newCat)
    }

    // 잠깐의 딜레이 후 다음 고양이를 준비합니다.
    setTimeout(() => {
      setNextCatLevel(Math.floor(Math.random() * 4))
      setIsDropping(false)
    }, 500)
  }

  const handleRestart = () => {
    window.location.reload()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
        background: '#f0f4f8',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', color: '#333' }}
      >
        고양이 게임
      </Typography>

      <Paper
        elevation={4}
        sx={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          position: 'relative',
          cursor: gameOver ? 'default' : 'pointer',
          overflow: 'hidden',
          borderRadius: '16px',
          background: '#e3f2fd',
        }}
        onMouseMove={handleMouseMove}
        onClick={handleDropCat}
        ref={containerRef}
      >
        {/* --- 5. 이제 React가 고양이들을 직접 렌더링합니다. --- */}
        {renderableCats.map((cat) => {
          const catInfo = CAT_LEVELS[cat.level]
          if (!catInfo) return null
          return (
            <Box
              key={cat.id}
              sx={{
                position: 'absolute',
                left: cat.x - catInfo.radius,
                top: cat.y - catInfo.radius,
                width: catInfo.radius * 2,
                height: catInfo.radius * 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: catInfo.color,
                transform: `rotate(${cat.angle * (180 / Math.PI)}deg)`,
                willChange: 'transform, left, top',
              }}
            >
              <Cat size={catInfo.iconSize} strokeWidth={2.5} />
            </Box>
          )
        })}

        {!gameOver && !isDropping && (
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              left: indicatorX,
              transform: 'translateX(-50%)',
              textAlign: 'center',
              pointerEvents: 'none', // 마우스 이벤트가 통과되도록 설정
            }}
          >
            <Cat
              size={CAT_LEVELS[nextCatLevel].iconSize}
              color={CAT_LEVELS[nextCatLevel].color}
            />
          </Box>
        )}

        <Box
          sx={{
            position: 'absolute',
            top: GAME_OVER_LINE_Y,
            width: '100%',
            borderTop: '2px dashed red',
            opacity: 0.5,
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
          <Paper
            elevation={2}
            sx={{
              p: '8px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.8)',
            }}
          >
            <Trophy color="gold" />
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {score}
            </Typography>
          </Paper>
        </Box>

        {gameOver && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              zIndex: 10,
            }}
          >
            <Typography variant="h2" component="h2" sx={{ fontWeight: 'bold' }}>
              Game Over
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Final Score: {score}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleRestart}>
              다시 시작
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
