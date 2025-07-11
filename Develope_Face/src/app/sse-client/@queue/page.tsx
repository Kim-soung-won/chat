"use client";

import { useEffect, useState, useRef } from 'react';
import { Button, Box, Typography, List, ListItem, Paper, LinearProgress } from '@mui/material';

const TOTAL_TASKS = 100;
// ... (인터페이스 정의는 이전과 동일)

export default function SsePerformanceTestPage() {
  // ... (상태 변수 선언은 이전과 동일)
  const [sseMessages, setSseMessages] = useState<string[]>([]);
  const [isSseConnected, setIsSseConnected] = useState<boolean>(false);
  const [sseError, setSseError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);

  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    // 이 useEffect는 컴포넌트 마운트 시 한 번만 실행되어 SSE 연결을 설정합니다.
    console.log('[CLIENT] useEffect: SSE 연결 설정 시도...');
    if (!eventSourceRef.current) {
      const evtSource = new EventSource('/api/sse/events/queue'); // SSE 엔드포인트
      eventSourceRef.current = evtSource;
      console.log('[CLIENT] new EventSource 생성됨. 초기 readyState:', evtSource.readyState, '(0: CONNECTING)');

      evtSource.onopen = (event) => {
        console.log('[CLIENT] evtSource.onopen: SSE 연결 성공! readyState:', evtSource.readyState, '(1: OPEN)', '이벤트 객체:', event);
        setIsSseConnected(true);
        setSseError(null);
        setSseMessages(prev => ["[시스템] SSE 연결 성공!"]);
      };

      evtSource.addEventListener('connected', (event) => {
        try {
          const data = JSON.parse((event as MessageEvent).data);
          console.log('[CLIENT] SSE "connected" 이벤트 수신:', data);
          setSseMessages(prev => [...prev, `[시스템] ${data.message}`]);
        } catch (e) {
          console.error('[CLIENT] "connected" 이벤트 데이터 파싱 오류:', (event as MessageEvent).data, e);
        }
      });

      evtSource.addEventListener('taskProgressUpdate', (event) => {
        try {
          const data = JSON.parse((event as MessageEvent).data);
          console.log('[CLIENT] SSE "taskProgressUpdate" 이벤트 수신:', data);
          setSseMessages(prev => [...prev, `[진행-${data.taskId}] ${data.message} (${data.progress}%)`]);
        } catch (e) {
          console.error('[CLIENT] "taskProgressUpdate" 이벤트 데이터 파싱 오류:', (event as MessageEvent).data, e);
        }
      });
      
      evtSource.addEventListener('taskCompleted', (event) => {
        try {
          const data = JSON.parse((event as MessageEvent).data);
          console.log('[CLIENT] SSE "taskCompleted" 이벤트 수신:', data);
          setSseMessages(prev => [...prev, `[완료-${data.taskId}] ${data.message}`]);
          
          setCompletedTasks(prevCompleted => {
            const newCompleted = new Set(prevCompleted);
            newCompleted.add(data.taskId);
            return newCompleted;
          });
        } catch (e) {
          console.error('[CLIENT] "taskCompleted" 이벤트 데이터 파싱 오류:', (event as MessageEvent).data, e);
        }
      });

      evtSource.onerror = (errorEvent) => {
        // onerror는 Event 객체가 아니라 일반 Error 객체 또는 단순 Target을 가리킬 수 있음
        // 실제 에러 내용은 브라우저 콘솔에서 errorEvent 객체를 직접 확인하는 것이 더 정확할 수 있습니다.
        console.error('[CLIENT] evtSource.onerror: SSE EventSource 에러 발생! readyState:', evtSource.readyState, '에러 이벤트 객체:', errorEvent);
        setIsSseConnected(false);
        setSseError('SSE 연결 중 에러가 발생했거나 서버가 스트림을 닫았습니다. 개발자 콘솔을 확인하세요.');
        
        if (evtSource.readyState === EventSource.CONNECTING) {
          console.log('[CLIENT] onerror: EventSource가 재연결을 시도 중일 수 있습니다 (readyState: CONNECTING).');
        } else if (evtSource.readyState === EventSource.CLOSED) {
          console.log('[CLIENT] onerror: EventSource 연결이 완전히 닫혔습니다 (readyState: CLOSED). 더 이상 자동 재연결 안 함.');
          // 이 경우, 사용자가 명시적으로 다시 연결을 시도해야 할 수 있습니다.
          // 또는 서버가 의도적으로 연결을 종료한 것일 수 있습니다.
        }
        
        if (isTestRunning) {
          setIsTestRunning(false); 
        }
      };
    }

    return () => {
      console.log('[CLIENT] useEffect cleanup: 컴포넌트 언마운트 또는 재실행 전');
      if (eventSourceRef.current && eventSourceRef.current.readyState !== EventSource.CLOSED) {
        console.log('[CLIENT] 기존 EventSource 연결 닫는 중...');
        eventSourceRef.current.close();
        eventSourceRef.current = null; // 참조도 초기화
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []); // 빈 의존성 배열: 컴포넌트 마운트 시 1회 실행, 언마운트 시 정리

  // ... (나머지 useEffect 훅들과 handleStartTest 함수, return JSX는 이전과 동일하게 유지)
  // ... (이전 답변의 나머지 클라이언트 코드 붙여넣기)
  useEffect(() => {
    if (isTestRunning && startTime) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.round((Date.now() - startTime) / 10) / 100);
      }, 100);
    } else if (!isTestRunning && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isTestRunning, startTime]);

  useEffect(() => {
    if (completedTasks.size === TOTAL_TASKS && isTestRunning) {
      setIsTestRunning(false); 
    }
  }, [completedTasks, isTestRunning, elapsedTime]);

  const handleStartTest = async () => {
    if (isTestRunning) return;
    if (!isSseConnected || !eventSourceRef.current || eventSourceRef.current.readyState !== EventSource.OPEN) {
      alert("SSE 연결이 준비되지 않았습니다. 잠시 후 다시 시도해주세요.\n현재 상태: " + (eventSourceRef.current ? eventSourceRef.current.readyState : "없음"));
      // 연결이 안되어있다면, 여기서 강제로 SSE 연결을 재시도하는 로직을 넣을 수도 있습니다.
      // 예를 들어, eventSourceRef.current?.close(); eventSourceRef.current = null; 한 뒤
      // 새로운 EventSource를 생성하도록 유도 (하지만 useEffect에서 이미 처리 중이므로 복잡해질 수 있음)
      return;
    }

    setSseMessages(prev => prev.filter(msg => msg.startsWith("[시스템]")));
    setCompletedTasks(new Set());
    setElapsedTime(0);
    setStartTime(Date.now());
    setIsTestRunning(true);

    console.log(`[CLIENT] 테스트 시작: ${TOTAL_TASKS}개의 POST 요청을 보냅니다.`);
    for (let i = 1; i <= TOTAL_TASKS; i++) {
      fetch('/api/sse/events/queue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId: i }),
      })
      .then(async res => {
        if (!res.ok) {
          const errorText = await res.text().catch(() => "응답 본문 읽기 실패");
          console.error(`[CLIENT] Task ${i} 요청 실패 (${res.status}): ${errorText}`);
        }
      })
      .catch(err => {
        console.error(`[CLIENT] Task ${i} 요청 전송 중 네트워크 에러:`, err);
      });
    }
  };

  const overallProgress = (completedTasks.size / TOTAL_TASKS) * 100;

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        SSE 동시 요청 테스트 ⏱️
      </Typography>
      <Typography variant="body2" align="center" sx={{mb:2}}>
        (각 작업 3초 소요, 초당 중간 진행 이벤트 발생)
      </Typography>
      <Button 
        variant="contained" 
        onClick={handleStartTest} 
        disabled={isTestRunning || !isSseConnected}
        sx={{ mb: 2, display: 'block', mx: 'auto' }}
      >
        {isTestRunning ? `테스트 진행 중... (${completedTasks.size}/${TOTAL_TASKS} 완료)` : `${TOTAL_TASKS}개 작업 동시 요청 시작`}
      </Button>
      
      <Paper elevation={2} sx={{ p: 2, mt: 2, mb: 2 }}>
        <Typography variant="h6">테스트 상태</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography>SSE 연결: {isSseConnected ? '연결됨 ✅' : '연결 끊김 ❌'}</Typography>
          {startTime && isTestRunning && <Typography>경과 시간: {elapsedTime.toFixed(2)} 초</Typography>}
          {!isTestRunning && startTime && <Typography>총 소요 시간: {elapsedTime.toFixed(2)} 초</Typography>}
        </Box>
        {sseError && <Typography variant="body2" color="error">SSE 에러: {sseError}</Typography>}
        
        {startTime && (
          <Box mt={1}>
            <Typography>전체 진행률: {completedTasks.size} / {TOTAL_TASKS} 완료</Typography>
            <LinearProgress variant="determinate" value={overallProgress} sx={{height: 10, borderRadius: 5, mt: 0.5 }} />
          </Box>
        )}
      </Paper>
      
      <Typography variant="h6" sx={{ mt: 3 }}>SSE 이벤트 로그:</Typography>
      <Paper elevation={1} sx={{ maxHeight: '300px', overflowY: 'auto', p: 1, mt: 1, fontSize: '0.8rem' }}>
        <List dense>
          {sseMessages.map((msg, index) => (
            <ListItem key={index} sx={{ py: 0.1, borderBottom: '1px dashed #eee' }}>
              {msg}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}