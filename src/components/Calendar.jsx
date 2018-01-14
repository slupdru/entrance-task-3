import React from "react";
function Calendar(props) {
  return (
    <div
      style={
        props.displayB === true ? { display: "block" } : { display: "none" }
      }
      className="calendar"
      id="calendar_2"
    >
      <div className="calendar_container">
        <div className="calendar_december">
          <div className="calendar_month-title">Декабрь</div>
          <div className="calendar_table">
            <table>
              <tbody>
                <tr>
                  <th>ПН</th>
                  <td>1</td>
                  <td>8</td>
                  <td>15</td>
                  <td>22</td>
                  <td>29</td>
                </tr>
                <tr>
                  <th>ВТ</th>
                  <td>2</td>
                  <td>9</td>
                  <td>16</td>
                  <td>23</td>
                  <td>30</td>
                </tr>
                <tr>
                  <th>СР</th>
                  <td>3</td>
                  <td>10</td>
                  <td>17</td>
                  <td>24</td>
                  <td>31</td>
                </tr>
                <tr>
                  <th>ЧТ</th>
                  <td>4</td>
                  <td>11</td>
                  <td>18</td>
                  <td>25</td>
                  <td className="td_light">1</td>
                </tr>
                <tr>
                  <th>ПТ</th>
                  <td>5</td>
                  <td>12</td>
                  <td>19</td>
                  <td>26</td>
                  <td className="td_light">2</td>
                </tr>
                <tr>
                  <th>СБ</th>
                  <td>6</td>
                  <td>13</td>
                  <td>20</td>
                  <td>27</td>
                  <td className="td_light">3</td>
                </tr>
                <tr>
                  <th>ВС</th>
                  <td>7</td>
                  <td className="td_today">14</td>
                  <td>21</td>
                  <td>28</td>
                  <td className="td_light">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="calendar_january">
          <div className="calendar_month-title">Январь</div>
          <div className="calendar_table">
            <table>
              <tbody>
                <tr>
                  <th>ПН</th>
                  <td>1</td>
                  <td>8</td>
                  <td>15</td>
                  <td>22</td>
                  <td>29</td>
                </tr>
                <tr>
                  <th>ВТ</th>
                  <td>2</td>
                  <td>9</td>
                  <td>16</td>
                  <td>23</td>
                  <td>30</td>
                </tr>
                <tr>
                  <th>СР</th>
                  <td>3</td>
                  <td>10</td>
                  <td>17</td>
                  <td>24</td>
                  <td>31</td>
                </tr>
                <tr>
                  <th>ЧТ</th>
                  <td>4</td>
                  <td>11</td>
                  <td>18</td>
                  <td>25</td>
                  <td className="td_light">1</td>
                </tr>
                <tr>
                  <th>ПТ</th>
                  <td>5</td>
                  <td>12</td>
                  <td>19</td>
                  <td>26</td>
                  <td className="td_light">2</td>
                </tr>
                <tr>
                  <th>СБ</th>
                  <td>6</td>
                  <td>13</td>
                  <td>20</td>
                  <td>27</td>
                  <td className="td_light">3</td>
                </tr>
                <tr>
                  <th>ВС</th>
                  <td>7</td>
                  <td>14</td>
                  <td>21</td>
                  <td>28</td>
                  <td className="td_light">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="calendar_february">
          <div className="calendar_month-title">Февраль</div>
          <div className="calendar_table">
            <table>
              <tbody>
                <tr>
                  <th>ПН</th>
                  <td>1</td>
                  <td>8</td>
                  <td>15</td>
                  <td>22</td>
                  <td className="td_light">29</td>
                </tr>
                <tr>
                  <th>ВТ</th>
                  <td>2</td>
                  <td>9</td>
                  <td>16</td>
                  <td>23</td>
                  <td className="td_light">30</td>
                </tr>
                <tr>
                  <th>СР</th>
                  <td>3</td>
                  <td>10</td>
                  <td>17</td>
                  <td>24</td>
                  <td className="td_light">31</td>
                </tr>
                <tr>
                  <th>ЧТ</th>
                  <td>4</td>
                  <td>11</td>
                  <td>18</td>
                  <td>25</td>
                  <td className="td_light">1</td>
                </tr>
                <tr>
                  <th>ПТ</th>
                  <td>5</td>
                  <td>12</td>
                  <td>19</td>
                  <td>26</td>
                  <td className="td_light">2</td>
                </tr>
                <tr>
                  <th>СБ</th>
                  <td>6</td>
                  <td>13</td>
                  <td>20</td>
                  <td>27</td>
                  <td className="td_light">3</td>
                </tr>
                <tr>
                  <th>ВС</th>
                  <td>7</td>
                  <td>14</td>
                  <td>21</td>
                  <td>28</td>
                  <td className="td_light">4</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
