import React from "react";
// import { useState } from "react";
// import play from './assets/play.svg';
// import reset from './assets/reset.svg'
// import up from './assets/arrow-up-solid.svg'
// import down from './assets/arrow-down-solid.svg'
// function App() {
//   // initiating state
//   const [displayTime, setDisplayTime] = useState(25 * 60); // setting the initial time of 25 mins
//   const [breakTime, setbreakTime] = useState(5 * 60);
//   const [sessionLength, setSessionLength] = useState(25 * 60);
//   const [timeron, setTimeron] = useState(false);
//   const [onBreak, setOnBreak] = useState(false);
//   const [breakAudio, setBreakAudio] = useState(new Audio('./sound/beep.mp3'));

//   // formatting time 
//   function formatTime(time) {
//     let minutes = Math.floor(time / 60);
//     let seconds = time % 60;

//     return (
//       ( minutes < 10 ? "0" + minutes : minutes ) + ":" + (seconds < 10 ? "0" + seconds: seconds)
//     )
//   }

//   const changeTime = (amount, type) => {
//     if (type === "break") {
//       if (breakTime <= 60 && amount < 0) {
//         return;
//       }
//       setbreakTime((prevState) => prevState + amount);
//     } else {
//       if (sessionLength <= 60 && amount < 0) {
//         return;
//       }
//       setSessionLength((prevState) => prevState + amount)

//       if (!timeron) {
//         setDisplayTime(sessionLength + amount)
//       }
//     }
//   }

//   function controlTime() {
//     let second = 1000;
//     let date = new Date().getTime();
//     let nextDate = new Date().getTime() + second;
//     let onBreakVariable = onBreak;

//     if (!timeron) {
//       let interval = setInterval(() => {
//         date = new Date().getTime();
//         if (date > nextDate) {
//           setDisplayTime((prev) => {
//             return prev - 1
//           })
//           nextDate += second;
//         }
//       }, 30)
//       localStorage.clear()
//       localStorage.setItem('interval-id', interval);
//     }
//     if (timeron) {
//       clearInterval(localStorage.getItem('interval-id'));
//     }
//     setTimeron(!timeron);
//   }

//   function resetTime() {
//     setDisplayTime(25 * 60);
//     setSessionLength(25 * 60);
//     setbreakTime(5 * 60);
//   }

//   function playSound() {
//     breakAudio.currentTime = 0;
//     breakAudio.play();
//   }
//   return (
//     <div className="app-container">
//       <div>
//         <h1>25 + 5 Clock</h1>
//         <div className="time-intervals">
//           <Length 
//             changeTime={changeTime}
//             time={breakTime}
//             type={"break"}
//             formatTime={formatTime}
//           />
//           <SessionTime 
//             changeTime={changeTime}
//             time={sessionLength}
//             type={"session"}
//             formatTime={formatTime}
//           />
//         </div>
//         <div id="timer-label">
//           <p>Session</p>
//           <div id="time-left">{formatTime(displayTime)}</div>
//         </div>
//         <div className="control-btns">
//           <div id="start_stop"
//             onClick={controlTime}
//           ><img src={play} /></div>
//           <div id="reset"
//             onClick={resetTime}
//           ><img src={reset} /></div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // setting the length time
// function Length({changeTime, type, time, formatTime}) {
//   return (
//     <div>
//             <h3 id="break-label">Break Length</h3>
//             <div id="break-decrement"
//               onClick={() => changeTime(-60, type)}
//             ><img src={down} /></div>
//             <div id="break-length">{formatTime(time)}</div>
//             <div id="break-increment"
//               onClick={() => changeTime(+60, type)}
//             ><img src={up} /></div>
//           </div>
//   )
// }

// // setting the session time
// function SessionTime({changeTime, type, time, formatTime}) {
//   return(
//     <div>
//             <h3 id="session-label">Session Length</h3>
//             <div id="session-decrement"
//               onClick={() => changeTime(-60, type)}
//             ><img src={down} /></div>
//             <div id="session-length">{formatTime(time)}</div>
//             <div id="session-increment"
//               onClick={() => changeTime(+60, type)}
//             ><img src={up} /></div>
//           </div>
//   )
// }
// export default App;


const projectName = '25-5-clock';<br />

const accurateInterval = function (fn, time) {
  var cancel, nextAt, timeout, wrapper;
  nextAt = new Date().getTime() + time;
  timeout = null;
  wrapper = function () {
    nextAt += time;
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return fn();
  };
  cancel = function () {
    return clearTimeout(timeout);
  };
  timeout = setTimeout(wrapper, nextAt - new Date().getTime());
  return {
    cancel: cancel
  };
};

// COMPONENTS:
class TimerLengthControl extends React.Component {
  render() {
    return (
      <div className="length-control">
        <div id={this.props.titleID}>{this.props.title}</div>
        <button
          className="btn-level"
          id={this.props.minID}
          onClick={this.props.onClick}
          value="-"
        >
          {/* <i className="fa fa-arrow-down fa-2x" /> */}
          <i class="bi bi-caret-down-fill"></i>
        </button>
        <div className="btn-level" id={this.props.lengthID}>
          {this.props.length}
        </div>
        <button
          className="btn-level"
          id={this.props.addID}
          onClick={this.props.onClick}
          value="+"
        >
          {/* <i className="fa fa-arrow-up fa-2x" /> */}
          <i class="bi bi-caret-up-fill"></i>
        </button>
      </div>
    );
  }
}

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    };
    this.setBrkLength = this.setBrkLength.bind(this);
    this.setSeshLength = this.setSeshLength.bind(this);
    this.lengthControl = this.lengthControl.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.beginCountDown = this.beginCountDown.bind(this);
    this.decrementTimer = this.decrementTimer.bind(this);
    this.phaseControl = this.phaseControl.bind(this);
    this.warning = this.warning.bind(this);
    this.buzzer = this.buzzer.bind(this);
    this.switchTimer = this.switchTimer.bind(this);
    this.clockify = this.clockify.bind(this);
    this.reset = this.reset.bind(this);
  }
  setBrkLength(e) {
    this.lengthControl(
      'brkLength',
      e.currentTarget.value,
      this.state.brkLength,
      'Session'
    );
  }
  setSeshLength(e) {
    this.lengthControl(
      'seshLength',
      e.currentTarget.value,
      this.state.seshLength,
      'Break'
    );
  }
  lengthControl(stateToChange, sign, currentLength, timerType) {
    if (this.state.timerState === 'running') {
      return;
    }
    if (this.state.timerType === timerType) {
      if (sign === '-' && currentLength !== 1) {
        this.setState({ [stateToChange]: currentLength - 1 });
      } else if (sign === '+' && currentLength !== 60) {
        this.setState({ [stateToChange]: currentLength + 1 });
      }
    } else if (sign === '-' && currentLength !== 1) {
      this.setState({
        [stateToChange]: currentLength - 1,
        timer: currentLength * 60 - 60
      });
    } else if (sign === '+' && currentLength !== 60) {
      this.setState({
        [stateToChange]: currentLength + 1,
        timer: currentLength * 60 + 60
      });
    }
  }
  timerControl() {
    if (this.state.timerState === 'stopped') {
      this.beginCountDown();
      this.setState({ timerState: 'running' });
    } else {
      this.setState({ timerState: 'stopped' });
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
    }
  }
  beginCountDown() {
    this.setState({
      intervalID: accurateInterval(() => {
        this.decrementTimer();
        this.phaseControl();
      }, 1000)
    });
  }
  decrementTimer() {
    this.setState({ timer: this.state.timer - 1 });
  }
  phaseControl() {
    let timer = this.state.timer;
    this.warning(timer);
    this.buzzer(timer);
    if (timer < 0) {
      if (this.state.intervalID) {
        this.state.intervalID.cancel();
      }
      if (this.state.timerType === 'Session') {
        this.beginCountDown();
        this.switchTimer(this.state.brkLength * 60, 'Break');
      } else {
        this.beginCountDown();
        this.switchTimer(this.state.seshLength * 60, 'Session');
      }
    }
  }
  warning(_timer) {
    if (_timer < 61) {
      this.setState({ alarmColor: { color: '#a50d0d' } });
    } else {
      this.setState({ alarmColor: { color: 'white' } });
    }
  }
  buzzer(_timer) {
    if (_timer === 0) {
      this.audioBeep.play();
    }
  }
  switchTimer(num, str) {
    this.setState({
      timer: num,
      timerType: str,
      alarmColor: { color: 'white' }
    });
  }
  clockify() {
    if (this.state.timer < 0) return "00:00";
    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer - minutes * 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return minutes + ':' + seconds;
  }
  reset() {
    this.setState({
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: { color: 'white' }
    });
    if (this.state.intervalID) {
      this.state.intervalID.cancel();
    }
    this.audioBeep.pause();
    this.audioBeep.currentTime = 0;
  }
  render() {
    return (
      <div>
        <div className="main-title">25 + 5 Clock</div>
        <TimerLengthControl
          addID="break-increment"
          length={this.state.brkLength}
          lengthID="break-length"
          minID="break-decrement"
          onClick={this.setBrkLength}
          title="Break Length"
          titleID="break-label"
        />
        <TimerLengthControl
          addID="session-increment"
          length={this.state.seshLength}
          lengthID="session-length"
          minID="session-decrement"
          onClick={this.setSeshLength}
          title="Session Length"
          titleID="session-label"
        />
        <div className="timer" style={this.state.alarmColor}>
          <div className="timer-wrapper">
            <div id="timer-label">{this.state.timerType}</div>
            <div id="time-left">{this.clockify()}</div>
          </div>
        </div>
        <div className="timer-control">
          <button id="start_stop" onClick={this.timerControl}>
            <i class="bi bi-play-circle-fill"></i>
            <i class="bi bi-pause-circle-fill"></i>
          </button>
          <button id="reset" onClick={this.reset}>
          <i class="bi bi-arrow-clockwise"></i>
          </button>
        </div>
        <div className="author">
          {' '}
          Designed and Coded by <br />
          <a href="https://github.com/D-souz/clock-25" target="_blank">
            D'souza
          </a>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.audioBeep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

export default Timer;
