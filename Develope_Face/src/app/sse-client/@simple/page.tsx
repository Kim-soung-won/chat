"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { Button, Box, Typography, List, ListItem, Paper, LinearProgress } from '@mui/material';

const TOTAL_TASKS_SIMPLE_SSE = 100; // 테스트할 총 작업 수

interface SimpleSseTaskData {
  taskId: string | number; // 서버에서 taskId를 문자열로 보낼 수도, 클라이언트에서는 숫자로 관리
  progress?: number;
  message: string;
}

export default function SseClientPageAppRouter() { // 또는 SseSimpleIndividualTestPage 등
  const [sseMessages, setSseMessages] = useState<string[]>([]);
  // isSseConnected는 개별 연결이 많으므로 전체적인 테스트 진행 상태로 대체
  const [sseGlobalError, setSseGlobalError] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<Set<string | number>>(new Set());
  const [isTestRunning, setIsTestRunning] = useState<boolean>(false);
  
  const activeEventSourcesRef = useRef<EventSource[]>([]); // 여러 EventSource 인스턴스 관리
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 스톱워치 타이머
  useEffect(() => {
    if (isTestRunning && startTime) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.round((Date.now() - startTime) / 10) / 100);
      }, 100);
    } else if (!isTestRunning && timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    return () => { if (timerIntervalRef.current) clearInterval(timerIntervalRef.current); };
  }, [isTestRunning, startTime]);

  // 모든 작업 완료 체크
  useEffect(() => {
    if (completedTasks.size === TOTAL_TASKS_SIMPLE_SSE && isTestRunning) {
      setIsTestRunning(false); // 스톱워치 및 테스트 상태 중지
      activeEventSourcesRef.current.forEach(es => {
        if (es.readyState !== EventSource.CLOSED) es.close();
      });
      activeEventSourcesRef.current = [];
    }
  }, [completedTasks, isTestRunning, elapsedTime]);

  // 테스트 시작 함수
  const handleStartSimpleSSETest = () => {
    if (isTestRunning) return;

    setSseMessages([`[테스트] ${TOTAL_TASKS_SIMPLE_SSE}개의 개별 SSE 스트림 연결 시작...`]);
    setCompletedTasks(new Set());
    setElapsedTime(0);
    setStartTime(Date.now());
    setIsTestRunning(true);
    setSseGlobalError(null);

    // 이전 EventSource 인스턴스 정리
    activeEventSourcesRef.current.forEach(es => es.close());
    activeEventSourcesRef.current = [];

    for (let i = 1; i <= TOTAL_TASKS_SIMPLE_SSE; i++) {
      const taskId = i; // 또는 고유 ID 생성
      // 각 작업마다 새로운 EventSource 연결 생성
      // 서버 API 경로를 '/api/sse/events/simple-task'로 변경 (위에서 정의한 API 라우트)
      const evtSource = new EventSource(`/api/sse/events/simple?taskId=${taskId}`);
      activeEventSourcesRef.current.push(evtSource);

      // evtSource.onopen = () => {
      //   // 개별 연결 성공 로그 (너무 많을 수 있으므로 주석 처리)
      //   // console.log(`[Simple Client Task ${taskId}] SSE 연결 성공.`);
      // };

      evtSource.addEventListener('simpleTaskConnected', (event) => {
        const data = JSON.parse((event as MessageEvent).data) as SimpleSseTaskData;
        setSseMessages(prev => [...prev, `[Task ${data.taskId} 시스템] ${data.message}`]);
      });

      evtSource.addEventListener('simpleTaskProgress', (event) => {
        const data = JSON.parse((event as MessageEvent).data) as SimpleSseTaskData;
        setSseMessages(prev => [...prev, `[Task ${data.taskId} 진행] ${data.message} (${data.progress}%)`]);
      });
      
      evtSource.addEventListener('simpleTaskCompleted', (event) => {
        const data = JSON.parse((event as MessageEvent).data) as SimpleSseTaskData;
        setSseMessages(prev => [...prev, `[Task ${data.taskId} 완료] ${data.message}`]);
        
        setCompletedTasks(prevCompleted => {
          const newCompleted = new Set(prevCompleted);
          newCompleted.add(data.taskId); // taskId 타입 일치 확인
          return newCompleted;
        });
        evtSource.close(); // 해당 작업의 SSE 스트림은 여기서 종료
        activeEventSourcesRef.current = activeEventSourcesRef.current.filter(es => es !== evtSource);
      });

      // evtSource.addEventListener('simpleStreamEnd', (event) => { /* 서버가 이 이벤트 보내면 처리 */});

      evtSource.onerror = (errEvt) => {
        console.error(`[Simple Client Task ${taskId}] EventSource 에러. State: ${evtSource.readyState}`, errEvt);
        setSseMessages(prev => [...prev, `[Task ${taskId} 에러] 연결 실패 또는 조기 종료.`]);
        // 에러 발생 시에도 작업을 완료된 것으로 간주하여 테스트가 멈추지 않도록 함
        setCompletedTasks(prevCompleted => {
          const newCompleted = new Set(prevCompleted);
          if(!newCompleted.has(taskId)) newCompleted.add(taskId);
          return newCompleted;
        });
        if (evtSource.readyState !== EventSource.CLOSED) evtSource.close();
        activeEventSourcesRef.current = activeEventSourcesRef.current.filter(es => es !== evtSource);
      };
    }
  };

  // 컴포넌트 언마운트 시 모든 활성 EventSource 연결 정리
  useEffect(() => {
    return () => {
      console.log('[Simple Client] 컴포넌트 언마운트. 모든 활성 EventSource 연결 닫음.');
      activeEventSourcesRef.current.forEach(es => {
        if (es.readyState !== EventSource.CLOSED) es.close();
      });
      activeEventSourcesRef.current = [];
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const overallProgress = (completedTasks.size / TOTAL_TASKS_SIMPLE_SSE) * 100;

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <Typography variant="h5" component="h1" gutterBottom align="center">
        개별 SSE 스트림 동시 요청 테스트 ⏱️
      </Typography>
      <Typography variant="body2" align="center" sx={{mb:2}}>
        (100개의 EventSource 동시 연결, 각 연결은 3초간 이벤트 수신 후 자동 종료)
      </Typography>
      <Button 
        variant="contained" 
        color="primary" // 이전 "Queue" 방식과 색상 구분
        onClick={handleStartSimpleSSETest} 
        disabled={isTestRunning}
        sx={{ mb: 2, display: 'block', mx: 'auto' }}
      >
        {isTestRunning ? `개별 스트림 테스트 중... (${completedTasks.size}/${TOTAL_TASKS_SIMPLE_SSE} 완료)` : `${TOTAL_TASKS_SIMPLE_SSE}개 작업 동시 SSE 시작 (개별)`}
      </Button>
      
      <Paper elevation={2} sx={{ p: 2, mt: 2, mb: 2 }}>
        <Typography variant="h6">테스트 상태</Typography>
        {isTestRunning && startTime && <Typography>경과 시간: {elapsedTime.toFixed(2)} 초</Typography>}
        {!isTestRunning && startTime && completedTasks.size > 0 && <Typography>총 소요 시간: {elapsedTime.toFixed(2)} 초</Typography>}
        {sseGlobalError && <Typography variant="body2" color="error">전역 에러: {sseGlobalError}</Typography>}
        
        {startTime && (
          <Box mt={1}>
            <Typography>전체 진행률: {completedTasks.size} / {TOTAL_TASKS_SIMPLE_SSE} 완료</Typography>
            <LinearProgress variant="determinate" value={overallProgress} sx={{height: 10, borderRadius: 5, mt: 0.5 }} color="primary" />
          </Box>
        )}
      </Paper>
      
      <Typography variant="h6" sx={{ mt: 3 }}>SSE 이벤트 로그 (개별 작업 스트림 통합):</Typography>
      <Paper elevation={1} sx={{ maxHeight: '300px', overflowY: 'auto', p: 1, mt: 1, fontSize: '0.8rem' }}>
        <List dense>
          {sseMessages.map((msg, index) => (
            <ListItem key={index} sx={{ py: 0.1, borderBottom: '1px dashed #eee', wordBreak: 'break-all' }}>
              {msg}
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}