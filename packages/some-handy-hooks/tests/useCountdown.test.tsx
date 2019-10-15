import { renderHook, act } from '@testing-library/react-hooks';
import { useCountdown } from '../src';

let tickCount = 0;
const doTheTick = () => {
  tickCount += 1;
  jest.spyOn(global.Date, 'now').mockReturnValue(new Date(2019, 1, 1, 0, 0, tickCount, 0).getTime());
  jest.advanceTimersByTime(1000);
};

describe('useCountdown', () => {
  jest.useFakeTimers();
  beforeEach(() => {
    tickCount = 0;
    jest.spyOn(global.Date, 'now').mockReturnValue(new Date(2019, 1, 1, 0, 0, 0, 0).getTime());
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('Should reduce seconds by one for 1 tick', () => {
    const { result } = renderHook(() => useCountdown({ seconds: 10 }));
    expect(result.current.seconds).toBe(10);
    act(() => {
      doTheTick();
    });
    expect(result.current.seconds).toBe(9);
  });

  it('Should reduce seconds by tree for 3 ticks', () => {
    const { result } = renderHook(() => useCountdown({ seconds: 10 }));
    act(() => {
      doTheTick();
      doTheTick();
      doTheTick();
    });
    expect(result.current.seconds).toBe(7);
  });

  it('Should format the time parts correctly', () => {
    const { result } = renderHook(() => useCountdown({ hours: 24 }));
    act(() => {
      jest.spyOn(global.Date, 'now').mockReturnValue(new Date(2019, 1, 1, 0, 0, 0, 1).getTime());
      jest.advanceTimersByTime(1000);
    });
    expect(result.current.milliseconds).toBe(999);
    expect(result.current.seconds).toBe(59);
    expect(result.current.minutes).toBe(59);
    expect(result.current.hours).toBe(23);
    expect(result.current.totalMilliseconds).toBe(23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000 + 999);
    expect(result.current.totalSeconds).toBe(23 * 60 * 60 + 59 * 60 + 59);
    expect(result.current.totalMinutes).toBe(23 * 60 + 59);
    expect(result.current.totalHours).toBe(23);
  });

  it('Should fire finished callback once countdown reaches 0', () => {
    const handleOnFinish = jest.fn();
    const { result } = renderHook(() => useCountdown({ seconds: 2, onFinish: handleOnFinish }));
    act(() => {
      doTheTick();
      doTheTick();
    });
    expect(result.current.totalMilliseconds).toBe(0);
    expect(handleOnFinish).toHaveBeenCalledTimes(1);
  });

  it('Should allow to pause the countdown', () => {
    const { result } = renderHook(() => useCountdown({ seconds: 10 }));
    act(() => {
      doTheTick();
      expect(result.current.seconds).toBe(9);
      result.current.pause();
      doTheTick();
      expect(result.current.seconds).toBe(9);
      doTheTick();
      expect(result.current.seconds).toBe(9);
    });
  });

  it('Should allow to resume paused the countdown', () => {
    const { result } = renderHook(() => useCountdown({ seconds: 10 }));
    act(() => {
      doTheTick();
      expect(result.current.seconds).toBe(9);
      doTheTick();
      expect(result.current.seconds).toBe(8);
      result.current.pause();
      doTheTick();
      expect(result.current.seconds).toBe(8);
      result.current.resume();
      doTheTick();
      expect(result.current.seconds).toBe(7);
    });
  });

  it('Should allow to restart the countdown', () => {
    const { result } = renderHook(() => useCountdown({ seconds: 10 }));
    act(() => {
      doTheTick();
      expect(result.current.seconds).toBe(9);
      doTheTick();
      expect(result.current.seconds).toBe(8);
      result.current.restart();
      doTheTick();
      expect(result.current.seconds).toBe(9);
      doTheTick();
      expect(result.current.seconds).toBe(8);
    });
  });
});
